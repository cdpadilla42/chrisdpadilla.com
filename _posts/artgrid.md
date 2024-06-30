---
title: Art Grid in Next.js
tags:
  - Tech
  - React
  - Node
  - JavaScript
  - Next
  - This Website
date: '2023-09-15T10:35:07.322Z'
---

A visit to the [homepage of this very site](/) on desktop will show the neat instagram-like image grid of my sketches! Now that much of my blog is visual, and since it's been a year of me drawing, it's time to make a nice display for my drawings.

![Equal parts Pokémon and Zelda, a good balance!](https://res.cloudinary.com/cpadilla/image/upload/v1694801728/chrisdpadilla/blog/imgs/artgrid_ofabdh.jpg)

Creating it with my current setup has been interesting! I'll walk you through it, covering extracting the images and piping them through Next's server side handler.

# Parsing Markdown

The setup for my blog is through static files. Meaning, every post is a markdown file, with metadata included at the top of the file, and the content following. It looks something like this:

```
---
title: Snivy & Mareep
tags:
  - Art
date: '2023-09-01T10:35:07.322Z'
---

![Charge!!!](https://res.cloudinary.com/cpadilla/image/upload/t_optimize/chrisdpadilla/blog/art/sniviiandmareep_cldzmr.jpg)

Pokémon — the gateway to doodling on math homework.

...

```
It makes for quick writing and keeps my content portable. 

The challenge with this approach, though, is that my images are hosted off site and they are displayed directly through the markdown. A fantastic beginner programmers challenge, if you're ever curios to test out a new language, is to: 

- Access a text file
- Parse it
- Return the results

I did just that with a few functions:

```
export const getImageValuesFromMarkdown = (md) => {
  const regex =
    /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g;
  return Array.from(md.matchAll(regex)).map((res) => res[1]);
};


export function getAllArtImages(
  fields = ['content', 'slug', 'tags', 'date'],
  options = {}
) {
  const slugs = getPostSlugs();
  let posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // Filter false values (.DS_STORE)
    .filter((post) => post)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  const regex = new RegExp('Art', 'i');
  posts = posts.filter((post) => post.tags?.some((e) => regex.test(e)));

  if (options.filter) {
    posts = posts.filter(options.filter);
  }

  if (options.skip) {
    posts = posts.slice(options.skip);
  }

  if (options.limit) {
    posts = posts.slice(0, options.limit);
  }

  const images = [];
  posts.forEach((post) => {
    const postImages = getImageValuesFromMarkdown(post.content);
    postImages.forEach((src) =>
      images.push({
        src: src,
        slug: post.slug,
      })
    );
  });

  return images;
}
```

`getAllArtImages` handles a fair amount of logic for getting all of my markdown files, sorting, and only grabbing the attributes I need. That includes *only* getting posts with the Art tag!

The interesting part here is down in the `forEach` loop. There, I'm calling `getImageValuesFromMarkdown`, which uses a regex to find all of the instances of a markdown denotation for an image. In the file, it looks like this:

```
![Charge!!!](https://res.cloudinary.com/cpadilla/image/upload/t_optimize/chrisdpadilla/blog/art/sniviiandmareep_cldzmr.jpg)
```

That all gets massaged into an array of objects with the image source and markdown slug so that the images link to the post.

# Displaying Images

From there, it's as simple as calling the method in `getServerSideProps()` on the page I want to display the grid:


```
export async function getServerSideProps() {
  const images = getAllArtImages().slice(0, 6);

  return {
    props: {
      images,
    },
  };
}
```

From there, there's nothing too fancy about it. The react component is simply looping through the images:

```
import Link from 'next/link';
import React from 'react';

const ArtGrid = ({ images }) => {
  return (
    <>
      <section className="art_display">
        {images.map((image, i) => (
          <article key={image.src} className={`${i > 0 ? 'hideonmobile' : ''}`}>
            <Link href={`/${image.slug}`}>
              <a data-test="musicGridLink">
                <div
                  className="artgridimage"
                  style={{
                    height: '250px',
                    width: '250px',
                    background: 'transparent no-repeat center',
                    backgroundSize: 'cover',
                    margin: 'auto',
                    backgroundImage: `url('${image.src}')`,
                  }}
                />
              </a>
            </Link>
          </article>
        ))}
      </section>
    </>
  );
};

export default ArtGrid;

```

I'm using the div with a background image set to center the images. Not the most accessible way, but the most-sane way to handle centering images without distorting their aspect ratio.

And that's all there is to it! 

Are there tradeoffs to this approach? Why, yes there are! A future concern of mine is for the time when the number of files gets too large, and starts slowing things down. My next step is to take a look into a caching system: Generating the list of images *once* and saving the results so that this call doesn't happen every time the server receives a request.

A post for another day!