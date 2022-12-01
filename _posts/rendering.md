---
title: SSG vs SSR vs CSR
tags:
  - Tech
  - Architecture
  - Node
date: '2022-07-11T05:35:07.322Z'
---

While building my site, I did a deep dive into rendering. Next.js can serve up static files, client side rendering, and server side rendering. All on a page-by-page level, even! I wanted to define the pros and cons of each. Here's what I found:

# Static Files

These are the fastest to serve up! Think a simple HTML file or image. There's nothing to process, the server just loads the file and sends it off. These are easily distributed to CDN's as well, so that speed translates all the way from California to Australia.

# Static Site Generation

The benefits of static files, with the flexibility of templating. If data is stored in a DB or CMS and needs to be piped into your site, this is a great solution. On site build (say, when you push new code), static HTML files are generated from templates and pulled data. The data needs to be something relatively unchanging, as the site typically only builds once and then caches the statically generated HTML files.

Next has some neat enhancements to this. [**Incremental Static Regeneration**](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) can regenerate your pages after build as your data is updated. You can either set this to a time interval or you can even connect your CMS to your app with a webhook. This way the site only regenerates when data is updated.

# Server Side Rendering

As the name suggests, rendering happens on the server the same as with SSG. The difference is that it's on request as opposed to build. Build happens infrequently and is triggered by a specific event. Requests, however, are when a user requests your webpage. This has been the way of the web for decades, with php, Ruby on Rails, and even Node.js and Express.

With several different rendering options now available, this method shines with data that changes fairly frequently. This is also a great solution for sites requiring user authentication, such as logging in to a portal to view your utilities bill.

# Client Side Rendering

The new hotness, relatively speaking. A JS framework such as React or Vue is used to send a root div and a whole lot of JavaScript to dynamically render the page in the browser. Data is often pulled from several sources that are frequently updated. This is the solution of choice for building apps, dashboards, and anything requiring real time data.

# The Weird Middle-ground

So, the above is a spectrum, typically trading site performance for the freshness of data served (to vastly oversimplify it.)

What if you fit somewhere in the middle? Incremental Static Regeneration is really close to Server Side Rendering on the spectrum. Which do you go with then?

My situation is that my data is not changing, but the conditions for rendering them does change. I finish writing my blog posts on one day, push them to the site, but then only want them to publish a week later.

OK, so ISG would be great. You can time the interval of when to regenerate the page. What's the big deal?

# Decisions Depends on Volume

Traffic. I'm just starting the site, so volume is pretty low. With ISG, the first visitor after the regeneration event gets a cached version of the site. Then, later visitors get the fresh one. But that first person is a big deal to me! If I were a national e-commerce site, no sweat. But I'm a local mom and pop shop on the internet.

Not to mention ISG adds a layer of complexity and maintenance unto itself.

So! My choice for the site is to go with SSR. I trade off the wicked fast benefits of SSG and ISG. In it's stead I have greater simplicity and the assurance that the few folks visiting my site at the start are getting the freshest content.

As traffic increases, switching over to ISG is still an option thanks to Next's flexibility.
