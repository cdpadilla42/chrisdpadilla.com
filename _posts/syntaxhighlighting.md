---
title: Blog Post Syntax Highlighting
tags:
  - Tech
  - React
  - Node
  - Next
date: '2024-04-26T10:35:07.322Z'
---

I've added syntax highlighting to the blog! Long overdue. Here's how I made it happen:

## Setup

This site is a [Next.js app](https://nextjs.org/). The blog posts are generated with the built in [Static Site Generation](/rendering) feature. For each post, I grab all the urls to render and then they are constructed at build time:

```
import AlbumPage from '/components/albumPage';
import { getAllPosts, getAlbumBySlug, getAlbums } from '../lib/api';
import { getPostBySlug } from '../lib/markdownAccess';
import PostPage from '/components/PostPage';
import markdownToHtml from '../lib/markdownToHtml';

// The Main Component
export default function SlugPage({ post, album }) {
  if (post) return <PostPage post={post} />;
  if (album) return <AlbumPage album={album} />;
}

// Get static props - gather required page data based on page
export async function getStaticProps({ params }) {
  
  // . . . 
  
  const post = getPostBySlug(params.slug, [...);

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

// Get the static paths for all posts and pages
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

The `post` object contains the raw markdown and meta data for the page. All of the site's pages are built from that markdown and are rendered to JSX through this component:

```
import markdownStyles from './markdown-styles.module.css';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import Image from 'next/image';
import NextLink from './NextLink';

export default function PostBody({ content }) {
  return (
    <div className="markdown">
      <Markdown
        options={{
          overrides: {
            a: NextLink,
            img: BlogImage,
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}

// const BlogImage = (props) => <Image {...props} width={800} layout="fill" />;
const BlogImage = (props) => (
  <a href={props.src} target="_blank" rel="noopener noreferrer">
    <img {...props} />
  </a>
);
```

[Markdown to JSX](https://www.npmjs.com/package/markdown-to-jsx) is doing the heavy lifting of rendering my markdown annotations to html. I've also plugged in a few custom overrides to make use of Next features, such as the `NextLink` to handle routing through the app, as well as an `img` override to open in a new tab by default.

## Adding In Highlight.js

[Highlight.js](https://highlightjs.org/) is a flexible library that can do exactly what I'm looking for, both on the client and server.

Since I'm building static pages, I'll reach for their server implementation to call:

```
html = hljs.highlightAuto('<h1>Hello World!</h1>').value
```

I could use their client side approach, wrapped up in a `useEffect`. However, that adds to the js bundle sent down the wire. Not to mention, I'd get this ugly flicker effect once the styles kicked in.

So, I'm opting to build another override.

Markdown renders code in a `<pre>` and nested `<code>` tag. So I'll add my own components to plugin the synchronous syntax highlighting:

First, importing highlight.js and adding my override:

```
import hljs from 'highlight.js';

export default function PostBody({ content }) {

  return (
    <div className="markdown">
      <Markdown
        options={{
          overrides: {
            a: NextLink,
            img: BlogImage,
            pre: Pre,
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
```

And then writing my custom components:

```
const CodeBlock = ({className, children}) => {
  children = hljs.highlightAuto(children, ['java', 'javascript', 'python', 'react', 'yaml']).value;
  return (
    <pre>
      <code dangerouslySetInnerHTML={{__html: children}} />
    </pre>
  );
}

const Pre = ({children, ...rest}) => {  
  return <pre {...rest}>{children}</pre>;
}
```


Violà! The colors you see above are thanks to these changes!