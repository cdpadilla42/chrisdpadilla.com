---
title: Setting Up End-to-End Testing with Cypress
tags:
  - Tech
  - Testing
date: '2023-01-05T14:35:07.322Z'
---

After [musing on the design benefits of testing](/testingandwriting), I'm rolling up my sleeves! I'm diving into setting up [Cypress](https://www.cypress.io/) with my blog.

This was _also_ inspired by a message I received lately about my [RSS feed](/api/feed) being down! After hastily writing a fix, I wanted to start setting up measures to keep a major bug from flying under the radar.

# Cypress

A post for another day is the different types of tests in software. The quick run down, from atomic to all-encompassing, goes like this: Static Tests, Unit Tests, Integration Tests, and End-to-End Tests.

Cypress is on the farther end of that spectrum, encompassing End-to-End testing. Cypress will spin up a browser, walk through your application, and use the site as a user would.

There's a suite of tools and assertion methods included from the popular Mocha and Chai testing frameworks.

For my blog, I don't have many complex features. It's largely a static site. If we were to define the happy path, it would mostly entail clicking links and reading articles. So asserting that will be as simple as gathering links and checking their status codes on request.

Cypress setup is laid out nicely in [their docs](https://docs.cypress.io/guides/getting-started/installing-cypress#Node-js). For a few more handy utility methods, you can also install the Cypress Testing Library:

```
$  npm i -D cypress @testing-library/cypress
```

Note the `-D` flag. For both Cypress and any testing packages, you'll want to save these as Dev Dependencies. We're not planning on shipping any of these modules with the app, so it's an important distinction.

# Writing Tests

After initializing the app with the following command-

```
npx cypress open
```

—Cypress will lay out boiler plate files and directories for the app. I'm going to add a `cypress/e2e/verifyLinks.js` file for my own tests. Here's what it will look like:

```
import { BASE_URL, BASE_URL_DEV } from '../../lib/constants';

const baseUrl = process.env.NODE_ENV === 'production' ? BASE_URL : BASE_URL_DEV;

describe('RSS', () => {
  it('Loads the feed', () => {
    cy.request(`${baseUrl}/api/feed`).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});

```

To break down a few of the testing specific methods:

- **describe** Is a wrapper for related tests.
- **it** is the keyword for a test. Essentially saying "Test this procedure."
- **request** is doing just that, sending and http request.
- **expect** is our assertion. We are expecting our status to equal 200 for this link.

A simple example, but once this is up and running, it will verify that the request is indeed returning an "OK" status, and we can rest all the more easily tonight.

And that's enough to get started! Next steps would be to write a few more critical tests. Perhaps crawling the page for links and verifying that they are all returning 200. And with more tests, integrating into a CI workflow would make the app all the more secure without as the manual checks in our local environment. More to come!
