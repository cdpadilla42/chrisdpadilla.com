---
title: Rerouting Dynamic Routes in Next.js
tags:
  - Tech
  - React
  - Next
date: '2023-02-02T10:35:07.322Z'
---

I'm a fan of [short URLs](https://sive.rs/su). "chrisdpadilla.com/island" and "chrisdpadilla.com/cypressgithubactions" are for my albums and blog posts respectively. And they're both more satisfying than "chrisdpadilla.com/music/island" or even "chrisdpadilla.com/2022/06/03/coolblog". 

They feel more elegant. It's an aesthetic choice, one that I understand goes against current SEO trends. But I like it, nonetheless!

I've already been doing this with my blog for months. However, I'm now adding album pages to my site. My gut instinct was to go with a nested route: "/music/:album", but I ultimately wanted to stick with shorter URLs.

Here we'll take a look at solving this within Next.js Dynamic Routes.

# Original Setup

So, say you're like me and you have a "pages/[slug].js" file in your Next.js App. It probably looks something like this:

```
import { getPostBySlug, getAllPosts } from '../lib/api';

export default function Post({ post }) {
	// Page component logic...
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: 'blocking',
  };
}


```
- `Post` is the react component rendering our page. It receives post from `getStaticProps`
- `getStaticProps` is taking the slug from our url params `/:slug` and is looking for the matching post. Otherwise, it throws a 404.
- `getStaticPaths` is gathering all possible slugs for this page and will tell next to generate the static pages.

No sweat with one data source. But what if we have another?

# Managing Two Data Sources

It's more straightforward than you'd expect! For the most part, we're just going to add a bit more logic to these three pieces: The React component, `getStaticProps`, and `getStaticPaths`. Each will have a way to navigate between the data sources.

Starting with `getStaticPaths`:

```
export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);
  const albums = getAlbums();
  const slugs = [...albums, ...posts].map((contentObj) => contentObj.slug);

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: 'blocking',
  };
}

```

The only real change is merging our two sources of `albums` and `posts`.

Here's a look at `getStaticProps`:

```
export async function getStaticProps({ params }) {
  const album = getAlbumBySlug(params.slug);
  if (album) {
    return {
      props: { album },
    };
  }

  const post = getPostBySlug(params.slug);

  if (post) {
    return {
      props: {
        post,
      },
    };
  }

  return {
    notFound: true,
  };
}

```
A few simple if statements covers our bases. One performance consideration: I have fewer albums than blog posts, so I'm asking the function to check albums first for a match. Then we can search for a matching post. The nice thing, though, is that since we're generating static pages, ultimately performance will be quick for both content types when the site is built.

Lastly, we'll route our react component to two different page components:

```
import AlbumPage from '/components/albumPage';
import PostPage from '/components/PostPage';

export default function SlugPage({ post, album }) {
  if (post) return <PostPage post={post} />;
  if (album) return <AlbumPage album={album} />;
}

```

One of the shorter React components I've ever written! We're just routing here. 

I'm not needing to account for 404 cases. That's already covered with this code in `getStaticProps`:

```
  return {
    notFound: true,
  };
```

And that's all there is to it! A little extra traffic control for an, ultimately, cleaner site URL experience.