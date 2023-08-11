---
title: New Blog Layout and Pagination
tags:
  - Tech
date: '2023-08-11T10:35:07.322Z'
---

I've updated my blog home page to show posts in full instead of just the titles. I'm doing too much art and music making to let all that fun stuff hide behind a click!

I also found out I've posted over 200 times to this blog!! A great milestone! _And_ a fun performance issue to navigate with pagination. :)

![Hey Diglett!](https://res.cloudinary.com/cpadilla/image/upload/v1691699173/chrisdpadilla/blog/imgs/Screen_Shot_2023-08-10_at_3.25.49_PM_wnfuxh.png)

## Pagination

In a big picture sense, you need these things:

- Loads of data to render, like blog posts
- A way to query it
- A maximum number per page (the interval at which to show data)
- A way to keep track of which page you're on.

That translates to:

- Content
- API/DB Calls
- Limit value
- Skip value

## Calculating Skip

Skip value is the most interesting value up there. If you have a limit of 5 posts per page, you'll know your starting place if you know what page you're on. Page 1 will shows items 0-4, so there's no skip.

Page 2, however, starts at 5. So we can get this for each page by multiplying the page number minus 1 by 5.

```
const skip = limit * (page - 1)
```

From there, passing that to the DB will get you just the data you need.

## Getting Page State

Plenty of ways to do it, though the most user friendly is likely to keep it in your query params. Your url will look something like `/blog?p=2`. It has the benefit of allowing users to use the back button on their browser.

Here's how you can get that value in `getServerSideProps` in Next:

```
export async function getServerSideProps(context) {
  const page = context.query.p || 1;
  const count = getPostsCount();

  const skip = (page - 1) * 5;
  const allPosts = getAllPosts(
    {
      skip,
      limit: 5,
    }
  );

  return {
    props: { allPosts },
  };
}
```

`context` is passed from next with the query params (including any that you set yourself through the `[id].js` naming convention.) Very handy!

## Setting Page State

It's as simple as linking to the new url! First I'll get the current page through the client side router:

```
import { useRouter } from 'next/router';

export default function Blog({ allPosts, count }) {
  const router = useRouter();
  const query = router.query;
  const currentPage = parseInt(query.p) || 1;
  const lastPage = Math.ceil(count / 5);
```

And then I can use it in my links below.

```
<div className="pagination-controller" style={{ display: 'flex' }}>
  <div className="left" style={{ flex: '1' }}>
    {currentPage !== 1 && (
      <Link href={`${router.pathname}?p=${currentPage - 1}`}>Back</Link>
    )}
  </div>
  <div className="right" style={{ flex: '1', textAlign: 'right' }}>
    {currentPage < lastPage && (
      <Link href={`${router.pathname}?p=${currentPage + 1}`}>Next</Link>
    )}
  </div>
</div>
```

You'll have to do the math to add or reduce a page while ensuring you're not going out of bounds. Above I'm hiding the links based on the calculated `lastPage`.
