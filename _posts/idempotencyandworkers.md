---
title: Idempotency and Workers
tags:
  - Tech
  - JavaScript
  - TypeScript
date: '2026-01-24T15:21:10.322Z'
---

Sending an asynchronous job off to a worker to handle a background task can lighten the load of a main application, but it takes careful consideration around how to ensure we aren't then seeing duplicate results. This is the idea around a portion of a system being idempotent. Here's how I navigated this in my own work this week:

## Email

Say that I'm building an email sending service. There are a few components:

- Client app that first sends an email from a template page (which is aware that this should only be sent once.)
- An application layer that receives the request, then adds it to...
- A queue, which waits for an available worker before passing off the email message
- Email Sender Worker, which actually formats and sends the email.

Ideally, our Client app has some logic that already prevents multiple sends from, say, multiple clicks of the send button. What about an edge case where there was a network failure after a successful send, the user gets UI saying there was an issue, and resends the request?

Our backend system needs to be able to detect that a duplicate request is coming in and should not process it.

## Solutions

Saving a unique request ID is the answer. Depending on where we want our idempotency check to occur, we can generate an ID, check against persistent state to see if we have already received that ID, and then decide to either pass it through if it's new or discard it if not.

A few options present themselves in our example. The client could perhaps be responsible for generating and checking the existence of a request ID. However, if there is an interruption on the client, we could potentially lose this ID.

A more consistent angle would be saving the ID with unique fields in persistent storage. A DB table could contain fields for the `requestID`, `requestStatus`, the `userID`, and `templateType`, allowing us to look up a document based on the `userID` and `templateType` to verify if this email has already been sent previously.

```
// Worker

export const emailHandler = async (event: EmailHandlerEvent): Promise<void> => {
  const {emailRequestID, recipient, subject, body} = event;

  // Idempotency check: Already done?
  const existing = await emailRequestStore.findByRequestID(emailRequestID);
  if (existing?.status === "completed") return;

  // Send and mark complete
  const {messageId} = await sendEmail({recipient, subject, body});
  await emailRequestStore.markCompleted(emailRequestID, messageId);
};
```

This serves an additional purpose: If the application is successful in sending the first request, then it receives confirmation that it succeeded back, but fails to notify the client due to a network failure, then the user receives UI to try to send the request through again.

In this case, with a dedicated store for the state of our request, our worker could mark the email send as complete, and on the subsequent client request, the application layer could run its idempotency check — see that there has already been a request, and additionally that it's completed, and simply return a `200` back to the client, noting that the email send was successful.

```
// Application Layer

export const sendEmailRequest = async (input: SendEmailInput): Promise<SendEmailResponse> => {
  const {userID, templateType, ...emailData} = input;

  // Idempotency check: Has this user already requested this email type?
  const existing = await emailRequestStore.findByUserAndTemplate(userID, templateType);

  if (existing?.status === "completed") {
      return {requestID: existing.requestID, status: "completed", alreadySent: true};
  }

  if (existing?.status === "processing") {
      return {requestID: existing.requestID, status: "processing", alreadySent: false};
  }

  // Create request, invoke worker, return
  const requestID = uuidv7();
  await emailRequestStore.create({requestID, userID, templateType, status: "pending"});
  await invokeLambda("email-handler", {emailRequestID: requestID, ...input});
  await emailRequestStore.updateStatus(requestID, "processing");

  return {requestID, status: "processing", alreadySent: false};
};
```

Voilà!
