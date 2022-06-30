---
title: My New Website! Details and Tech
tags:
  - Tech
  - Project
date: '2022-06-25T05:35:07.322Z'
---

Very excited to have plowed some land and planted the seeds for my own garden on the web!

The sites I've developed have represented big phases in my life. Moomoofilms.com was my portfolio for youtube sketches when I was a kid. After grad school, I put up a music teaching portfolio site for students. Starting in tech, I put together a [landing page](https://chrispadilla.dev) for all my projects.

With chrisdpadilla.com, it feels like another step. A unified home for all the different wanderings I do in tech, music, and writing.

So yes, websites are great, would definitely recommend getting one!

With the sentimental side of the site laid out, let's talk tech!

# Considerations

## Features

Blogging is the main feature of the site. Aside from that, there's a little bit of static file hosting. I _do_ love the idea of playing with full stack features in the future, though, so having access to server side code is also a necessity.

## Longevity

At the same time, I want something that will last. This site will be my playground for experimenting with new code, but I don't plan on doing a [Scott Tolinski](https://scotttolinski.com/) level of regular refactoring.

I started hacking sites in the 2000s. A lot has changed and improved since then, and I want to take advantage of where development is made easier! And I do want to balance that with also making the site portable.

## Performance

On a structural level, I wanted the site to be performant and accessible. I grew up on view source, and I love when I stumble on a site where I can still find beautiful html in the developer tools. I'm a little old fashioned - even if I'm using modern tooling, I love the feeling of making a site similar to how I would have back when I was growing up. Simplicity just feels good!

# Tech

## Content in Markdown

My first decision was to build a system where I owned my content and could easily move it as frameworks and CMS's come and go. I do a lot of my personal writing, reflecting, and note taking in markdown already, so writing the blog in markdown files was an easy choice.

Since they are so lightweight, the posts are stored in the same repository as the code. Down the line, this also makes it really simple for updating the site. When ever I push a commit with a new post, the static site files will regenerate

## An Initial Detour

My first iteration of the site was an Express server. This hit all the boxes at first:

- It can easily handle blogging features, while being hugely extensible.
- Express has been tried and tested. The MVC approach to building websites, also, is a classic method.
- It would be performant, rendering static files.

I was determined - I was going to hand code as much as I could and learn a great deal along the way!

And then it got tedious. I'm up for a good challenge, but I found myself hitting decision fatigue very quickly.

I needed a bit more help. Momentum is a key ingredient in my projects. If I kept at it with Express, I felt I would lose that momentum.

## Next.js

I scrapped what I had and switched over to [Next.js](https://nextjs.org/). Put simply, Next handles everything I was looking to do myself, but makes it _effortless_.

Feature-wise, the framework is flexible enough to switch between Server Side Rendering and Static Site Generation on a page by page basis. On top of that, api routes are available to deploy serverless functions for any future features and integrations.

That lends itself to great performance. There's potential to ramp up the performance through caching, edge function support, and built in image optimization.

Next has been tried and tested. There's excellent community support. They're also up to version 12, after many successful iterations. I'm not worried about the technology disappearing.

## Asset Hosting on Amazon S3

An incredibly cheap and easy solution! Next pairs really well here. [`next/image`](https://nextjs.org/docs/basic-features/image-optimization) handles many key performance optimizations, so all I have to worry about is uploading assets onto the S3.

## Style and Design

My design is intentionally simple. I'm not a full blown minimalist (my desk is always a mess!) But I appreciate a design that doesn't detract from the content.

Structurally, everything is in one plane old CSS file. I'm using Custom Properties (variable) for some repeating values. But that's as fancy as it gets, though!

## Hosting on Vercel

Again, a natural pair with Next. It comes with integrated deployment through Github, easy to access logs, and simple set up for SSR and SSG. Also pretty cheap!

# Challenge

A future concern I have with the site is vendor lock in. Next works like a charm on Vercel. There's support for hosting on other platforms such as Digital Ocean and Netlify. It's hard to say at this point if staying on Next and hosting with Vercel will be the best choice in the future.

At this time, I definitely needed to get up and running quickly! So I'm happy with my choice today. As I continue developing, I'm planning to decouple my personal server logic from Next's API.

# Launch and Beyond

Now that the code is in a presentable spot, I'm ready to fill the pages up! I already have a few more blog posts and albums in the works. It feels great to have a central home for all of them.

Here are a few selected inspirations for the site's design:

- [Derek Sivers](https://sive.rs/)
- [Tania Rascia](https://www.taniarascia.com/)
- [Wes Bos](https://wesbos.com/)
- [Bandcamp dot com](https://bandcamp.com/)

Thanks for poking around! Definitely more to come.
