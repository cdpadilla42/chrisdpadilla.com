---
title: Running Cypress in CI with GitHub Actions
tags:
  - Tech
  - Testing
  - CI
date: '2023-01-20T10:35:07.322Z'
---

I [recently set this site up with Cypress](/cypressintro) for a few end-to-end tests.

(An aside: last time I referred to it as an End-to-end test, but on further reflection, we're probably looking more at these being integration tests. There's no major user interaction aside from GET requests. But, I digress in semantics. Chris Coyier puts [the subtle differences nicely over on his blog](https://chriscoyier.net/2022/11/11/the-difference-between-integration-testing-and-end-to-end-testing/).)

Here's a look at a new link verification test running in Cypress locally:

![So satisfying to see all the green text](https://padilla-media.s3.amazonaws.com/blog/imgs/Cypress+Testing.gif)

With the tests now giving me the ever so satisfying <span style="color: var(--green)">All Tests Passed</span> notification, it's time to automate this!

# Github Actions

There are many CI/CD solutions and approaches. In fact, this site is already using Vercel's Github App to automatically deploy pushes to master.

For simplicity I'm going to keep that in place, and run Cypress with GitHub Actions to automatically run my tests.

# Configuration

All that's needed to add an action is to create a config file in .github/workflows.yml at the root of the repo. Here's what mine looks like:

```
name: Cypress Tests

on: [push]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      # Install NPM dependencies, cache them correctly
      # and run all Cypress tests
      - name: Cypress run
        uses: cypress-io/github-action@v5.0.5 # use the explicit version number
        env:
          CYPRESS_BASE_URL: ${{ github.event.deployment_status.target_url }}
        with:
          browser: chrome
          build: npm run build
          start: npm start
          command: npx cypress run

```

Stepping through the important parts:

- Checkout is a built in GitHub action that will get your current main commit.
- Cypress has their own GitHub action that takes care of setting up your app.
- I had to set `CYPRESS_BASE_URL` to ensure that Cypress was looking for the correct endpoint, and not the localhost config that is set up in my cypress.config.js file.
- Cypress reccomends using explicit version numbers for consistency and stability.
- You can chose which browser to test with `browser: chrome`
- I'm passing in my build, start, and cypress commands, though this I believe is also implicit with the Cypress GitHub action.

Violà! Tests are now running with each push to master!

![Passing on GitHub too!](https://padilla-media.s3.amazonaws.com/blog/imgs/Screen+Shot+2023-01-17+at+12.32.30+PM.png)

# Next Steps

As it's currently setup, I'll get an email on failed tests, but Vercel is still picking up the new code and deploying it. Not an ideal solution, but since I'm a small operation here, I'm not in a hurry to add that structure.

But for the day that I do! The next step would be to remove my Vercel GitHub app from the repo. Then, I can add a deploy action as it's outlined in [this post on Vercel's repo](https://github.com/vercel/vercel/discussions/4589):

```
deploy_now:
    needs: build
    runs-on: ubuntu-latest
    steps:
        - uses: actions/checkout@master
        - name: deploy
          uses: actions/zeit-now@master
          env:
            ZEIT_TOKEN: ${{ secrets.ZEIT_TOKEN }}
```

The environment token can be retrieved by [following these steps](https://arctype.com/blog/github-vercel/).
