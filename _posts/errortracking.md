---
title: Error Tracking
tags:
  - Tech
date: '2022-09-05T05:35:07.322Z'
---

Solo deving a fairly large app has humbled me. Errors and bugs can sneak in. Even professional software ships with errors. I've had to accept that it's part of the feedback process of crafting software.

A lot of the development process for me in this project has been as follows:

1. Ship new feature
2. Collaborator tests it and finds a bug
3. Collaborator tells me something is broken, but with no code-related context they can share
4. The hunt ensues

Not ideal! I've been looking for ways to streamline bug squashing by logging pertinent information when errors occur.

Swallowing pride and accepting a path towards sanity, I've integrated an APM with my app. Here are the details on it:

# Using Sentry

I opted for Sentry. I did some research on Log Rocket and Exceptionless as well. All of them are fine pieces of software!

Log Rocket includes a live action replay. Exceptionless provides real time monitoring. And Sentry is focused on capturing errors at the code level.

For my needs, Sentry seemed to target exactly what I was experiencing — purely code-level issues.

# Integration

Integrating is as simply as a few npm packages and adding this code to the `index.js`:

```
import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from "./App";

//Add these lines
Sentry.init({
  dsn: "Your DSN here", //paste copied DSN value here
  integrations: [new Integrations.BrowserTracing()],

  tracesSampleRate: 1.0, //lower the value in production
});

ReactDOM.render(<App />, document.getElementById("root"));
```

One tweak I had to make was to set Sentry to only run in production. (I'm fairly certain I'll see the errors in development, thank you!)

```
if (process?.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: "Your DSN here", //paste copied DSN value here
    integrations: [new BrowserTracing()],

    tracesSampleRate: 1.0,
  });
}
```

With that bit of code, Sentry then comes with the stack trace, the OS and browser environment, potential git commits that caused the issue, and passed arguments. All sorts of goodies to help find the culprit!
