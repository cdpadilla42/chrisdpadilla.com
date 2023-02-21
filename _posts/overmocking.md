---
title: What Over-Mocking Looks Like
tags:
  - Tech
  - Testing
date: '2023-02-21T10:35:07.322Z'
---

TIL!

I'm testing a method that grabs the latest post tagged with "Hap." I want to verify that the post will return the latest result.

```
import fs from 'fs';
import { getLatestHap } from '../lib/api';

jest.mock('fs');

jest.mock('../lib/markdownAccess', () => ({
  getPostBySlug: () => ({ slug: '2023-01', tags: ['Notes', 'Haps'] }),
  getPostSlugs: () => ['2023-01'],
}));

test('getLatestHap', () => {
  const sampleMarkdownFile = { slug: '2023-01', tags: ['Notes', 'Haps'] };
  fs.readdirSync.mockResolvedValue([
    'postone.md',
    'posttwo.md',
    'postthree.md',
  ]);
  const result = getLatestHap();
  expect(result).toStrictEqual(sampleMarkdownFile);
});

```

I had to mock a few things to abstract their use:

- We don't need to test `fs`, so I mocked that.
- `getPostSlugs` is essentially one level above `fs`, so I mocked this
- `getPostBySlug` similarly is just a wrapper around `fs` after being passed a slug, so I mocked that.

So there! I've mocked all that doesn't need testing.

I then realized... what's left for me to test here?

This is the function I'm testing:

```
export const getLatestHap = (fields = ['slug', 'tags']) => {
  const posts = getAllPosts(fields);
  const latestHap = posts.find((post) => post.tags.includes('Haps'));
  return latestHap;
};
```

I've mocked this to the point where I'm essentially testing the native `find` Array method. Whoops.

# Mostly Integration

This is me learning from experience what [Guillermo Rauch](https://twitter.com/rauchg) [tweeted](https://twitter.com/rauchg/status/807626710350839808) and what [Kent C. Dodds expands upon](https://kentcdodds.com/blog/write-tests):

> Write tests. Not too many. Mostly integration.

Here I've nailed the first one, started to drift from the second point, and need to move towards the third to make my way out.

This test is trite because it's not testing any logic. This would largely be better as an integration test, or perhaps even an E2E test in Cypress. In an E2E test, I would be grabbing _lots_ of different cases along the way - are my pages loading, is data coming in properly from the source, and does it ultimately render correctly.

I've been learning about Jest, so this is a case of "Every problem is a nail when you have a hammer."

Ah well, lesson learned!

# E2E Version: A better way

Here's what that test looks like in Cypress:

```
import { BASE_URL, BASE_URL_DEV } from '../../lib/constants';

const baseUrl = process.env.NODE_ENV === 'production' ? BASE_URL : BASE_URL_DEV;

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Verify Now Page Renders Blog Page', () => {
  const blogURL = `${baseUrl}/now`;
  it('Loads the blog page with post', () => {
    cy.visit(blogURL);
    const markdownContainerElm = cy.get('.markdown');
    markdownContainerElm.should('be.visible');
  });
});

```

Here's what I'm doing:

1. Allowing for an unhandled minor error being thrown in the console with `Cypress.on('uncaught:exception', ...)`
2. Visiting the now page.
3. Checking for a `.markdown` element.
4. Verifying it exists. If no result is found by `getLatestHap`, a 404 would render.

Same amount of code, but here's what was tested along the way:

- `getLatestHap` is grabbing a markdown file
- My React component `NowPage` is receiving the post
- The page is rendering the result by creating a div with the class of `markdown` instead of a 404.

That's way better mileage over my trite unit test from before!
