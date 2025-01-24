---
title: Test Deliverable Outcomes
tags:
  - Tech
  - Testing
  - TypeScript
  - JavaScript
  - React
  - Next
date: '2025-01-23T10:35:07.322Z'
---

Opinions around testing in software are varied. Do you go with the [Pyramid shape](https://martinfowler.com/articles/practical-test-pyramid.html) or the [trophy approach](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)? Do you adopt Test Driven Development or lean more heavily on a few critical end-to-end tests after the code is written?

This past month, I spent time working on a side project that explores all the tests working hand-in-hand. I wanted the ideal scenario: 100% test coverage with a full suite of unit, integration, and e2e testing. Let's see if the juice was worth the squeeze!

## The App

My target for testing is this upsert page for a client management portal. We'll focus on a simplified version of this page, utilizing [React Hook Form](https://react-hook-form.com/) to control the form, [Mantine](https://mantine.dev/) to style, and [Zod](https://zod.dev/) for client side validation.

```
export default function ClientUpsert({
  client = undefined,
  newClient = false
}: {
  client?: Client;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting, disabled, isValid },
    control
  } = useForm<Client>({
    values: client,
    resolver: zodResolver(ClientUpsertSchema.partial()),
    mode: 'onBlur'
  });


  const onSubmit: SubmitHandler<Client> = async (data) => {
		// Truncating submit logic for brevity's sake.
		upsertClient(id, data);
  };

  return (
    <Container>
      <h1 role="heading">New Client</h1>
      <form onSubmit={handleSubmit(onSubmit)} key="upsert-client">
        <h2 role="heading">{client?.calculated?.fullName}</h2>
        <Stack gap="lg">
          <TextInput
            {...register('profile.firstName', { required: true })}
            label="First Name"
            error={errors.profile?.firstName?.message as string | undefined}
            role="textbox"
          />
          <TextInput
            {...register('profile.lastName', { required: true })}
            label="Last Name"
            error={errors.profile?.lastName?.message as string | undefined}
          />

          <Button
            value={true}
            type="submit"
            role="button"
            disabled={isSubmitting || disabled || !isValid}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

```

On the API side, I've created a function to upsert the client to MongoDB:

```
'use server';

/**
 * @throws Will throw an error if the patch object is empty after parsing.
 */
export async function upsertClient(
  id: string,
  patch: Partial<Client>
): Promise<UpdateResult> {
  const parsedPatch = deepPartialify(ClientUpsertSchema).parse(patch);
  if (!parsedPatch || Object.keys(parsedPatch).length === 0) {
    throw new Error('No patch data found');
  }

  const dotNotationPatch = getDotNotation(parsedPatch);

  const collection = client.db('my-db').collection('clients');

  const result = await collection.updateOne(
    { _id: id ? new ObjectId(id) : new ObjectId() },
    { $set: dotNotationPatch },
    { upsert: true }
  );

  revalidatePath(`/client/${id}`);
  return result;
}
```

You may notice the dance I'm having to do with `getDotNotation` before sending the patch object. More on that in [this blog post](/objectidconversion). I'm also using a function to make all deeply nested values in my Zod schema optional with `deepPartialify()`. [More on that here](/deeppartialzod).

For the most part, though, pretty straightforward server work. I'm validating the data on the server and then passing data to MongoDB. Because I'm using Next.js, I can add the `'use server';` directive so that I can call this function directly as a server action on the client.

## Server Tests

Let's start writing tests for the API:

```
import {
  upsertClient
} from '../client';
import { Db, MongoClient, ObjectId } from 'mongodb';
import { ObjectIdClient, Client } from '../schema';

declare global {
  var __MONGO_URI__: string;
  var __MONGO_DB_NAME__: string;
}
let mockClient: MongoClient;
let mockDb: Db;

beforeAll(async () => {
  mockClient = await MongoClient.connect(global.__MONGO_URI__, {});
  mockDb = mockClient.db(globalThis.__MONGO_DB_NAME__);
  (client.db as any as jest.Mock) = jest.fn().mockReturnValue(mockDb);

  await mockDb.collection('clients').insertMany([clientOne, clientTwo]);
});
describe('upsertClient', () => {
  const patchId = '677578204c102d057aa44812';

test('should insert a new client with valid patch data', async () => {
    const patch = { profile: { firstName: 'John', lastName: 'Doe' } };

    const result = await upsertClient(
      patchId,
      patch as Partial<Client>
    );

    expect(result).toEqual({
      acknowledged: true,
      upsertedId: new ObjectId(patchId),
      matchedCount: 0,
      modifiedCount: 0,
      upsertedCount: 1
    });

    const expectedPatchClient = {
      _id: new ObjectId(patchId),
      ...patch
    };

    const patchedClient = await mockDb
      .collection('clients')
      .findOne({ _id: new ObjectId(patchId) });

    expect(patchedClient).toEqual(expectedPatchClient);
  });

  test('should update a client with valid patch data', async () => {
    const patch = { profile: { firstName: 'Jim' } };

    const result = await upsertClient(
      patchId,
      patch as Partial<Client>
    );

    expect(result).toEqual({
      acknowledged: true,
      upsertedId: null,
      matchedCount: 1,
      modifiedCount: 1,
      upsertedCount: 0
    });

    const expectedPatchClient = {
      _id: new ObjectId(patchId),
      profile: { firstName: 'Jim', lastName: 'Doe' }
    };

    const patchedClient = await mockDb
      .collection('clients')
      .findOne({ _id: new ObjectId(patchId) });

    expect(patchedClient).toEqual(expectedPatchClient);
  })
};
```

Lot's going on here, but I'll summarize. These two tests are validating the expected behavior:

1. If a client is found, add the patch data.
2. If not, create a new client.

Additionally, I'm making use of the [jest-mongodb preset](https://jestjs.io/docs/mongodb) to spin up a local instance of mongodb. This allows me to have a test db available with every run of Jest. Very handy!

Once I've verified my tests are passing, I'm ready to move on to the client.

## Client Tests

There are several tests I could write for my `ClientUpsert` component. For demonstration, I'll focus on verifying a successful upsert:

```
/**
 * @jest-environment jsdom
 */

import React from 'react';
import {
  fireEvent,
  screen,
  waitFor
} from '@testing-library/react';
import { renderWithMantineProvider } from '@/lib/test-util/renderWithMantineProvider';
import { componentWithToastify } from '@/lib/test-util/renderWithToastify';
import '@testing-library/jest-dom';

jest.mock('@/lib/api/client/client', () => ({
  __esModule: true,
  upsertClient: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  __esModule: true,
}));


import ClientUpsert from './ClientUpsert';
import { upsertClient } from '@/lib/api/client/client';

describe('<ClientUpsert/ >', () => {

  test('Should show successful update notification after client updated', async () => {
    (upsertClient as jest.Mock).mockReturnValue({
      acknowledged: true,
      upsertedId: null,
      matchedCount: 1,
      modifiedCount: 1,
      upsertedCount: 0
    });

    // Arrange
    renderWithMantineProvider(
      componentWithToastify(<ClientUpsert client={clientOne} />)
    );
    const firstName = screen.getByLabelText('First Name');
    const submit = screen.getByRole('button');

    // Act
    fireEvent.change(firstName, {
      target: { value: 'Big Tuna' }
    });

    // Wait for the form state to update
    await waitFor(() => {
      expect(submit).toBeEnabled();
    });
    fireEvent.click(submit);

    // Assert
    expect(await screen.findByText('Client Updated')).toBeInTheDocument();
  });
});
```

Here I'm implmenting a [three-phased test](/threephasetests). I want this to be a true unit test of the component, so I'm going to mock the `upsertClient` call. We'll handle seeing the two interact in my end-to-end test.

The nice thing about doing so is that, should the logic of this component be used elsewhere with another method passed to the `onSubmit`, I don't have to worry about writing a whole new set of tests for it. We can simply focus on the UI performing as it should.

To stay true to the philosophy of React Testing Library, I'm also only concerned with seeing the visual sign of a successful upsert. In this case, it's a toast message appearing on the page.

With tests passing, it's time for end-to-end testing!

## End-To-End Testing with Playwright

[Playwright](https://playwright.dev/) is my flavor of the month for this project, and it's been a great experience so far! I'll skip the many quality-of-life features and will focus on finishing out our task here.

Let's write our user flow:

```
import test, { expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';

test.describe('New Client', () => {
  const clientInput = {
    firstName: 'Test',
    lastName: randomUUID(),
  };

  const clientFullName = `${clientInput.firstName} ${clientInput.lastName}`;


  test('should upsert a new client', async ({ page }) => {
    await page.goto('./client/new');
    expect(page.getByRole('heading', { name: 'New Client' })).toBeVisible();

    await page.getByLabel('First Name').fill(clientInput.firstName);
    await page.getByLabel('Last Name').fill(clientInput.lastName);

    const submitButton = page.getByRole('button', { name: 'Submit' });

    expect(submitButton).toBeEnabled();
    submitButton.click();

    await expect(
      page.getByRole('heading', {
        name: clientFullName
      })
    ).toBeVisible();

    await page.goto('./clients');
    await expect(page.getByText(clientFullName)).toBeVisible();
  });
});

```

Reading the code, the user journey is being described almost in plain english. I'm navigating to the page, filling out the form, submitting, and then verifying on a page containing all clients that the new document exists.

This can be tricky to maintain. Depending on how you chose to target elements, you may find yourself needing to update your selectors with any change. Targeting by element role is a safe approach because we are viewing essential page elements from the perspective of the user. And not just the typical mouse-in-hand user, but for screen reader users as well!

## Evaluating Time & Testing Your Deliverable

If I were to average out the amount of time spent trying to overachieve as a tester, I would say I spent nearly half of my time developing and half writing the test suite.

In some projects, that might not be a problem. However, I can see where doing this yielded diminishing returns after a certain point. Hypothetically, this scenario of a single use page likely only needed an end-to-end test, perhaps with integration tests for my API endpoints that will likely see reuse.

Yet, in another project, if this took two devs, one on the front end, one on the back end, I would want both of them delivering tests for their portions.

At the end of the day, like any other choice in software, the answer to "what to test" is "it depends." Each application is different in scope, technology, and usage. A reusable widget in an iFrame can likely benefit more from unit testing, while your client sign up flow will need e2e testing. It's really dependent on the size of your deliverable, then.

Not to say that if you have e2e coverage, you can skip over integration and unit tests. It could be a headache breaking those components out as modular units if that's the case.

Ultimately, though, time is a limited resource. Testing itself is worth the investment of time for several reasons: confidence in the functionality of your app, thoughtfulness around edge cases, and communication of it's expected behavior. Where you chose to invest that time, however, is dependent on your highest priority outcome.

## Supplemental Reading

- Alex Gusman has a great [walk through of his own experience](https://devsparks.goooseman.dev/hacks/20240615-why-e2e-tests/) using playwright and preferring e2e testing.
- Many of Kent C. Dodd's articles on testing have informed my thoughts here. Most relevant may be [How To Know What To Test](https://kentcdodds.com/blog/how-to-know-what-to-test).
- I've been reading Mark Richards' and Neal Ford's [Fundamentals of Software Architecture](https://www.oreilly.com/library/view/fundamentals-of-software/9781663728357/). They preface that any technical conversation starts off with "It Depends." So this article is just another big "It Depends" conversation.
- Speaking of, I love this faux O'Reilly cover also called "[It Depends](https://orlybooks.com/books/it-depends)."
