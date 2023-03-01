---
title: Testing Organizes Code
tags:
  - Tech
  - Testing
date: '2023-03-01T10:35:07.322Z'
---

[Rebecca Murphey](https://rmurphey.com/) has a fantastic. [talk on front end testing](https://www.youtube.com/watch?v=OzjogCFO4Zo&ab_channel=RemySharp). It's all done in JQuery, and the principles still apply really nicely to react applications.

My favorite takeaways:

1. **Testing allows for a clear explanation of what consumers of your code can expect.** Rebekah says this is like documentation, but even better! Tests will actually verify that the code does what it says it will, unlike documentation.
2. **Testing allows you to write methodically.** Writing the code is easy once you've written the expectations. This is further validation for [testing as a process of clear thinking](/testingandwriting). Put another way: Measure twice, cut once.
3. **Testing old code illuminates tight coupling.** Much of the talk is diving into an example of a long file of entangled responsibilities. Server requests, rendering data, managing state, all in one function. When you sit down to write a test for this, the coupling is quickly illuminated.

## Jest Supports This Systematically

That last point is one I'm coming up against in my own codebase.

This site keeps all it's content in markdown. So I have a _looong_ file with methods for grabing that data:

```
// api.js

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) return false;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields = [], options = {}) {
  const slugs = getPostSlugs();
  let posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // Filter false values (.DS_STORE)
    .filter((post) => post)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  if (options.filter) {
    posts = posts.filter(options.filter);
  }

  if (options.limit) {
    posts = posts.slice(0, options.limit);
  }

  return posts;
}

. . .

```

If I wanted to test `getAllPosts`, this is already difficult on a file-organization level. I can't very well mock the method `getPostSlugs` because with Jest you can only mock external packages.

I suppose this, in practice, isn't a terribly tight coupling. They are separate methods. **But** it has already illuminated an opportunity to break up this file to more closely follow a MVC model of organization. A strange paradigm to take on with the absence of a database here, but taking a step towards it lends to the first point at the top of this post - we get clarity in expectations of how this app is working. A big win already.
