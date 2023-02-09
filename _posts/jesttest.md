---
title: Verifying No Duplicate Routes with Jest
tags:
  - Tech
  - Testing
date: '2023-02-09T10:35:07.322Z'
---

I'm in a situation where I just implemented dynamic routes at my site directory in Next. Essentially, I have two sources of pages:

1. Albums
2. Blog Posts

They both are rendered on pages with slugs in this fashion:

- chrisdpadilla.com/spring
- chrisdpadilla.com/nextrerouting
- chrisdpadilla.com/acnm

One reason people advocate against this is that the namespace becomes cluttered. It's possible, then, to accidentally have an album and a blog title have the same slug.

Maybe a trite example since I'm a sole operation here — I _should_ be able to catch something like that. _But_ writing an integration test will help me sleep at night knowing that there's no _way_ this would happen on accident.

# Jest

My first step in setting up tests for the site was getting a few End-to-end checks. I've [set up Cypress](/cypressintro) and [written tests that verify the happy path on my site works](/verifybrokenlinks).

Cypress _can_ handle unit tests, but is a bit heavy handed for the solution. Jest is the long time favorite in this department, so I'm opting to bring that into the mix here.

# Writing The Test

I'm modeling my configuration after [the example in the Next.js repo](https://github.com/vercel/next.js/tree/canary/examples/with-jest).

With Jest running, I wrote out the test:

```
import { getAlbums, getAllPosts } from '../lib/api';

test('Verify no conflicting slugs', () => {
  const albums = getAlbums();
  const posts = getAllPosts(['slug']);

  const slugs = {};
  const recurringSlug = [];

  const verifyUniqueSlug = (item) => {
    const { slug } = item;
    if (slugs[slug]) {
      // Fail test
      recurringSlug.push(slug);
    }
    slugs[slug] = true;
  };

  albums.forEach(verifyUniqueSlug);
  posts.forEach(verifyUniqueSlug);
  expect(recurringSlug).toEqual([]);
});

```

To break it down:

1. I'm grabbing my slugs from both albums and posts
2. I'm iterating over both
3. For each slug, I check if it already exists.
4. If so, add it to the `recurringSlug` array
5. Check for an empty `reccuringSlug` array.

Voilà! I can sleep more soundly knowing that there are no conflicting slugs.
