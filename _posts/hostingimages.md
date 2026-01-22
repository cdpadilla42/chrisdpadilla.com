---
title: Hosting Images for chrisdpadilla dot com
tags:
  - Tech
date: '2023-02-24T10:35:07.322Z'
---

My site is turning into a lot of [images](/blog/art). I haven't really considered the way they're handled on my site very thoroughly until now.

My current strategy is hosting on an AWS S3 bucket and using the [Image component from Next JS](https://nextjs.org/docs/api-reference/next/image). With the component, Next handles the image optimization. So I can upload images as is (usually 2mb big) and Next will dynamically optimize for the resolution requested.

It's worked great on the pages I'm generating on the server. But I recently found out the component doesn't run on statically generated pages. For me that means all my blog posts aren't having their images compressed.

I serve up an [RSS feed](/api/feed), and that approach won't quite do there either. The next component would be cumbersome while generating the feed.

Essentially, I need a non-Next solution for taking a moderately high quality image from my host and dynamically serving up a light-weight image.

# My Options

1. I know _Wordpress_ has plugins for this sort of thing. But it's not really reasonable to migrate my site just for this sort of thing.
2. [TinyPNG](https://tinypng.com/) is one of the plugins, and they have a CDN and API solution. They'll even save your images to S3 after optimizing. A bit too involved for my taste here, though.
3. I used [Sanity](https://www.sanity.io/docs/image-url) for [AC: New Murder](/acnm). They had a nice library for querying images in the exact dimensions you needed, and this could be done dynamically. Getting warmer, but I'm not in need of a full-blown CDN.
4. Cloudinary has the same on-the-fly image optimizing through URL that Sanity has, _and_ a very generous free tier.

So I'm turning to [Cloudinary](https://cloudinary.com/). And so far, so good! I've created a named transform so that all I have to do is add a `t_optimize` param to the url to get a resized, compressed image. I can get more granular with it from here, but for my needs, it feels like this gets me most of the way there to optimized images.

```
https://padilla-media.s3.amazonaws.com/albums/covers/spring.jpg
```

And there we go! There's support to do this dynamically with JavaScript, and I have a way of bringing the images in to RSS without worrying about a heavy load time.
