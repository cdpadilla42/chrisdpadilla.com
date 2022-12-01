---
title: Adding RSS Feed to Next.js with SSR
tags:
  - Tech
  - Node
  - React
date: '2022-07-25T05:35:07.322Z'
---

I'm a big blog nerd. Growing up, I subscribed to my [favorite webcomics](https://www.qwantz.com/index.php?comic=3907). I mourned the death of Google Reader. I love the spirit of blogging today as an alternative, slow paced social media.

Naturally, I HAD to get one going on this site!

There are several great resources for getting a feed going with SSG and Next.js. [This one](https://sreetamdas.com/blog/rss-for-nextjs) was a favorite. Here, I'm going to add my experience setting it up with a SSR Next site.

# The Sitch

Here's what static site solutions suggested:

- Write your `rssFeedGenerator` function
- Add the function to a static page's `getStaticProps` method
- On build, the site will generate the feed and save it in a static XML file.

The issue for my use case is that my site is leveraging Server Side Rendering. I'm doing this so I can upload a post that is scheduled to release at a later date. With a static site, I would be stuck with old data and the post wouldn't release. With SSR, there is a simple date comparison that filters published and scheduled posts.

So, since we have a Server Side Rendering solution for pages, we need a SSR solution for the RSS feed.

# Rendering RSS Feed from the Server

I'll briefly start with the code to generate the XML file for the feed. I'm creating a `generateRSSFeed` method that largely looks similar to the one described in [this guide](https://sreetamdas.com/blog/rss-for-nextjs).

That gets passed to my handler `getRSSFeed`.

```
export async function getRSSFeed() {
  const posts = await getAllPostsWithConvertedContent(
    [
      'title',
      'date',
      'slug',
      'author',
      'coverImage',
      'excerpt',
      'hidden',
      'content',
    ],
    {
      filter: filterBlogPosts,
      limit: 10,
    }
  );

  const feed = generateRSSFeed(posts);
  return feed;
}
```

lib/api.js

And here's the tweak: I'm using the method in the api routes folder instead of `getStaticProps`.

```
import { getRSSFeed } from '../../lib/api';

export default async function handler(req, res) {
  const xml = await getRSSFeed();
  res.setHeader('Content-Type', 'application/rss+xml');
  res.send(xml);
}
```

pages/api/feed.js

Instead of generating a static file and saving it to our assets folder, here we're serving it up from the API directly.

And that's it! Once the time passes on a scheduled post, the next request to the feed will include that latest post!
