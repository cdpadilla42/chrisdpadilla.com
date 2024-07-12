---
title: Generating Back Links For Optimal Digital Gardening
tags:
  - Tech
  - Digital Garden
  - JavaScript
  - React
  - Next
  - This Website
date: '2024-07-05T10:35:07.322Z'
---


I came across Maggie Appleton's tremendous post ["A Brief History & Ethos of the Digital Garden"](https://maggieappleton.com/garden-history)! 

I've heard of the publishing philosophy in passing and found the term itself to resonate. A counter to high-production, corporate leaning purposes for owning a domain name, a digital garden assumes work in progress, a broad spectrum of topics and interests, and an ever evolving space online where ideas and things of beauty can blossom. _Lovely!_

There are a few patterns that show up with folks that have taken on the spirit of digital gardening. One that caught my eye was "Topography over Timelines." 

> Gardens are organized around contextual relationships and associative links; the concepts and themes within each note determine how it's connected to others.
> 
> This runs counter to the time-based structure of traditional blogs: posts presented in reverse chronological order based on publication date.
> 
> Gardens don't consider publication dates the most important detail of a piece of writing. Dates might be included on posts, but they aren't the structural basis of how you navigate around the garden. Posts are connected to other by posts through related themes, topics, and shared context.
> 
> One of the best ways to do this is **through Bi-Directional Links** – links that make both the destination page and the source page visible to the reader. This makes it easy to move between related content.
> 
> Because garden notes are densely linked, a garden explorer can enter at any location and follow any trail they link through the content, rather than being dumped into a "most recent” feed.


_Love it!_ My favorite discoveries are with sites that link well. It's a blast hopping around, continuing the conversation from page to page. Wikis are the prime example of this. Tough, some bloggers like [Austin Kleon](https://austinkleon.com/) also do this particularly well.

So! Why only be bound by linking in one chronological direction? I took to the idea and whipped up a script to employ this myself!

## Developing Bi-Directional Linking

[This site uses markdown](/parsemd) for posts. So doing this job is largely about text parsing. Much of the logic, in fact, is similar to [how I parse my posts to display an art grid](/artgrid).


I'll start by writing the function to actually get the url value from my links. The regex is looking for the value with parenthesis in the typical markdown shorthand for links: `![alt text](link)`

```JavaScript
// api.js

export const getInternalLinksFromMarkdown = (md) => {
  const regex =
    /(?:__|[*#])|\[(.*?)\]\(\/(.*?)\)/g;
  return Array.from(md.matchAll(regex)).map((res) => {
    if (res && res.length > 1) {
      return res[2];
    }
  });
};

```

The value of index 2 of the array will give me the capture group I've targeted because that's [how it's done in Node](/noderegex)!

From here, I'll then pass in my posts and systematically generate an object that grabs both the targeted url as well as the current post url.

```JavaScript
// api.js

export function getAllPostRefs(
  fields = ['content', 'slug', 'title'],
  options = {}
) {
  const slugs = getPostSlugs();
  let posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // Filter false values (.DS_STORE)
    .filter((post) => post)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  const links = {}
  posts.forEach((post) => {
    const postLinks = getInternalLinksFromMarkdown(post.content);
    postLinks.forEach((src) => {
      if (src && !src.includes('/')) {
        if (!links[src]) {
          links[src] = [];
        }
        if (!links[src].find(entry => entry.slug === post.slug))
        links[src].push({
          slug: post.slug,
          title: post.title,
        })
      }
    });
  })

  return links;
}

```

A Set data structure would be ideal for keeping duplicates out of the list, but we'll be converting this to JSON, and I'd rather avoid the hassle of bringing in a library for the conversion.

Finally, I'll call this function and save the results to a JSON file for refference.

```JavaScript
biDirectionalLink.js

import { getAllPostRefs } from "./api"
const FileSystem = require("fs");

export const getRefs = () => {
	const links = getAllPostRefs();
	FileSystem.writeFile('_cache/backlinks.json', JSON.stringify(links), (error) => {
    if (error) throw error;
  });
}

```

Here's an snippet of what it generates:

```
{
	"30": [
		{
			"slug": "2022",
			"title": "2022"
		},
		{
			"slug": "iwataonpeople",
			"title": "Iwata on Creative People"
		},
		{
			"slug": "transcience",
			"title": "Transience"
		},
		{
			"slug": "web2000",
			"title": "A Love Letter to 2000s Websites"
		}
	],
	"2022": [
		{
			"slug": "testingandwriting",
			"title": "Testing Software for the Same Reason You Write Notes"
		}
	],
	
	...
}
```

Voilà! Now I have the data of pages that are referenced. I can now call this method anytime the site regenerates and use this as the source of truth for back-linking.

To consume this in Next.js, I'm going to read the file in `getStaticProps` (or in an RSC if I were using the App Router)

```
// [slug].js

export async function getStaticProps({ params }) {
  if (post) {
    const file = await fs.readFile(process.cwd() + '/_cache/backlinks.json', 'utf8');
    const backlinks = JSON.parse(file);
    let pagesLinkingBackTo = null;

    if (backlinks[params.slug]) {
      pagesLinkingBackTo = backlinks[params.slug];
    }
```

And, following some prop drilling, I can now programmatically display these on matching pages:

```
// backLinkSection.js

import React from 'react';
import NextLink from './NextLink';

const BacklinksSection = ({pagesLinkingBackTo}) => {
	if (!pagesLinkingBackTo) return <></>
	return (
		<aside>
			<h4>
				Pages referencing this post:
				<ul>

				{pagesLinkingBackTo.map(link => (
					<li><NextLink href={link.slug}>{link.title}</NextLink> </li>
				))}
				</ul>
			</h4>
		</aside>
	);
};

export default BacklinksSection;
```

Assuming I haven't link to this page yet, you can see this in action at the bottom of my [Parsing Mardkown in Node](/parsemd) post. Now with handy links to click and explore related topics.

I'm excited to keep tending the garden! I've already seen themes emerge through the regular tags I use. Here's to a great harvest someday!