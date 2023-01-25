---
title: Making Next.js Links Flexible
tags:
  - Tech
date: '2023-01-24T10:35:07.322Z'
---

It's a little too verbose to use Next's Link component with an anchor tag each time:

```
 <Link href={album.link}>
	<a target="_blank" rel="noopener noreferrer">
      Support my music by purchasing the album on Bandcamp!
	</a>
 </Link>
```

There are design reasons for this. For example! It's easier to control opening a link in a new window when the anchor tag is exposed.

**BUT** we can do better. Here's a HOC that will check if the link is external (includes http) or internal (`/music/covers`):

```
import Link from 'next/link';
import React from 'react';

const NextLink = ({ children, ...props }) => {
  let newWindowAttr = {};
  if (props.href.includes('http')) {
    newWindowAttr = {
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }
  return (
    <Link {...props}>
      <a {...newWindowAttr}>{children}</a>
    </Link>
  );
};

export default NextLink;

```

As a rule on my site, internal links stay in the same window, external links open in a new window. Parsing the url this way does the trick.

Then we can use it like so:

```
 <NextLink href={album.link}>
    Support my music by purchasing the album on Bandcamp!
 </NextLink>

```
