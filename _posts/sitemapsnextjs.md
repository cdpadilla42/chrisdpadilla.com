---
title: Generating a Sitemap in NextJS
tags:
  - Tech
  - SEO
  - React
  - Next
  - Node
  - This Website
date: '2023-02-28T10:35:07.322Z'
---

I wanted to learn how to add search functionality to a NextJS Markdown blog. That's my blog and I'm starting to accumulate a lot of [posts](/blog) here! So I took to Google, and what did I find? Why, I found Julia Tan's post on ["How To Add Search Functionality to a NextJS Markdown Blog"](https://bionicjulia.com/blog/add-search-functionality-nextjs-markdown-blog-part-1).

I've been pretty happy with blogging being a more personal, long form means of keeping a dev journal. Recently, though, blogging has helped me [find my people](/findyourpeople) along the way. And that's really exciting! 

When a Google search sent me to a personal site and not a Medium article or Stack Overflow forum, that got me pretty excited. I'm not looking to growth hack my blog or become a domain authority, but I *do* want to make it easier for folks to find these posts. 

So begins an SEO cleanup!

# The Current Situation

My site currently checks off the boxes for the bare bone necessities here: I have meta tags for pages and I'm using Semantic HTML for easy parsing.

I tried Googling a few of my own articles with some disappointing results. "Express React Chris Padilla" at the time brought up my landing page, but not my article on it. 

I went through a few considerations of why this might be:

1. I don't track this, but I'm confident my blog doesn't get a lot of traffic at the moment. :)
2. I don't have keyword authority on Express or React, sure. But I have at least *more* authority  with "Chris Padilla" in a tech context, I would think!
3. I considered my URL structure. I [don't keep any subdirectories](/nextrerouting), but I learned that this doesn't really have a large sway on SEO.

# Sitemaps

No better source to ask about this than Google themselves. And a bit of looking brought me to sitemaps and why I might need one. 

A Sitemap is largely what it sounds like: It's an XML file that outlines the pages on your site. Bots will use this to ensure all your pages are crawled. [Here's mine](/sitemap.xml).

Here's [Google documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) on why you might need one:

> - Your site is large. Generally, on large sites it's more difficult to make sure that every page is linked by at least one other page on the site. As a result, it's more likely Googlebot might not discover some of your new pages.
> - Your site is new and has few external links to it. Googlebot and other web crawlers crawl the web by following links from one page to another. As a result, Googlebot might not discover your pages if no other sites link to them.

"Large" to Google probably means *hundreds or thousands* of pages, but my page count is crawling day by day. More important is probably that this is a new site and I'm not breaking the internet with these posts.

# Generating with NextJS

Next has great documentation on this and even provides [code for generating](https://nextjs.org/learn/seo/crawling-and-indexing/xml-sitemaps) your own sitemap.

I had to tweak mine just a bit to provide a couple of handy tags:

- `<priority>`: on a scale from 0 to 1.0, how important is this page? Landing page is 1.0. My [music](/music) page is 0.9.
- `<changefreq>`: This site is alive! This is how to let bots know the interval it typically updates. My [blog](/blog) page would be `daily` and my [now](/now) page would be `monthly`.

Here's what those tweaks look like in NextJS's `generateSiteMap` function:

```
function generateSiteMap(slugs) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--Manual URL's-->
     <url>
       <loc>${BASE_URL}</loc>
       <priority>1</priority>
       <changefreq>daily</changefreq>
     </url>
     ${slugs
       .map((slug) => {
         if (slug === 'blog') {
           return `
            <url>
              <loc>${`${BASE_URL}/${slug}`}</loc>
              <priority>0.9</priority>
              <changefreq>daily</changefreq>
            </url>
          `;
         } else if (slug === 'now' || slug === 'music') {
           return `
             <url>
               <loc>${`${BASE_URL}/${slug}`}</loc>
               <priority>0.9</priority>
               <changefreq>monthly</changefreq>
             </url>
           `;
         } else {
           return `
            <url>
              <loc>${`${BASE_URL}/${slug}`}</loc>
            </url>
          `;
         }
       })
       .join('')}
   </urlset>
 `;
}
```

Getting those values is business as usual for NextJS: write a `getServerSideProps` method.

```
export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const pages = getAllPages();
  const posts = getAllPosts(['slug']);
  const albums = getAlbums();
  const dynamicSlugs = [...albums, ...posts].map(
    (contentObj) => contentObj.slug
  );

  const slugs = [...pages, ...dynamicSlugs];

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(slugs);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
```

Funny to me is that you still have to export a default function. The `res.write()` and `res.end()` method above handle sending the XML file. But, I suppose Next still needs to see a React component for this to work happily:

```
function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export default SiteMap;
```

And there you have it! Here's hoping you've reached the end of this article after searching "Generating a Sitemap in NextJS." 