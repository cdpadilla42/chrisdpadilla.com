---
title: Migrating Blog Previews from SSR to SSG in Next
tags:
  - Tech
  - Next
  - React
  - JavaScript
  - This Website
date: '2023-09-29T10:35:07.322Z'
---

I've re-thought how I'm rendering my blog pages.

When I developed the site initially, I wasn't too worried about the difference between SSR and SSG. If anything, I wanted to lean on server rendering blog content so scheduled posts would load after their posting time passed.

Since then, my workflow has changed over to always publishing posts when I push the changes to GitHub. Posts are markdown files that are saved in the same repo as this site, so anytime a new post goes up, the site is rebuilt.

All that to say that I've been missing out on a juicy optimization opportunity with Next's static page generation!

So it's just as easy as switching the function name from `getServerSideProps` over to `getStaticProps`, right? Not quite in my case!

## Page Structure

The pages that I'm looking to switch over are my blog feed pages. So that includes:

- /blog
- /blog/[tag]
- /blog/[tag]/[page]

/blog is easy enough!

/blog/[tag] is the landing page for any of that tags clicked on either in a post or on my homepage. Tags could be what I have listed as "primary tags" such as "music", "art", or "tech." They could also be smaller tags, such as "React" that I have linked on individual blog pages, but that I don't list on my landing page or blog index page.

Some of those tags are now rendering content through pagination! So I have to take into account [page] numbers as well.

To get the full benefit of Static rendering with dynamic routes, I'll have to provide the routes that I want generated. Next has a fallback to server render requests that don't have a static page, so I'll exclude my smaller tags and focus in on the primary tags. I'll also want to generate the paginated links, measure how many pages need to be rendered per tag.

## getStaticPaths

`getStaticPaths` is the function where I'll be passing in my routes. This is added outside of the component alongside `getStaticProps` to then generate the content for those routes.

## For Tags Rendered as a List Page

This is pretty straightforward for tag pages. Just one level of looping involved:

```
export async function getStaticPaths() {
  return {
    paths: getBlogTagParams(),
    fallback: 'blocking',
  };
}

const getBlogTagParams = () => {
  const tagsDisplayedAsList = ['books', 'notes', 'tech', 'art', 'music'];
  return tagsDisplayedAsList.map((tag) => {
    return {
      params: {
        tag,
      },
    };
  });
};
```

## For Paginated Tags

For music and art, it's one more level of looping and a few more lines of code:

```

export async function getStaticPaths() {
  return {
    paths: getBlogPageParams(),
    fallback: 'blocking',
  };
}

const getBlogPageParams = () => {
  const allPostFields = ['title', 'date', 'hidden', 'tags'];
  const allPosts = getAllPosts(allPostFields);
  const publishedPosts = allPosts.filter(filterBlogPosts);

  const res = [];

  const fullPostPreviewTags = ['art', 'music'];

  fullPostPreviewTags.forEach((tag) => {
    const capitalizedTag = capitalizeFirstLetter(tag);
    const regex = new RegExp(capitalizedTag, 'i');
    let thisTagsPosts = publishedPosts.filter((post) =>
      post.tags.some((e) => regex.test(e))
    );
    const count = thisTagsPosts.length;
    const lastPage = Math.ceil(count / 5);
    const pageNumbers = Array.from({ length: lastPage }, (_, i) =>
      (i + 1).toString()
    );
    const tagSlug = lowercaseFirstLetter(tag);
    const thisTagAndPageParams = pageNumbers.map((pageNum) => ({
      params: {
        tag: tagSlug,
        page: pageNum,
      },
    }));
    res.push(...thisTagAndPageParams);
  });

  const feedCount = publishedPosts.length;
  const feedLastPage = Math.ceil(feedCount / 5);
  const feedPageNumbers = Array.from({ length: feedLastPage }, (_, i) =>
    (i + 1).toString()
  );
  const feedTagAndPageParams = feedPageNumbers.map((pageNum) => ({
    params: {
      tag: 'feed',
      page: pageNum,
    },
  }));
  res.push(...feedTagAndPageParams);

  return res;
};

```

There's a fair amount of data massaging in there. The key point of note is that for each tag, I'm calculating the number of pages by dividing total posts by how many are rendered to each page:

```
    const count = thisTagsPosts.length;
    const lastPage = Math.ceil(count / 5);
    const pageNumbers = Array.from({ length: lastPage }, (_, i) =>
      (i + 1).toString()
    );
```

From there, then it's a matter of piping that into the params object for `getStaticPaths`

Voilà! Now the site won't need to parse _every_ blog post to render each of these preview pages! The static file will already have been generated and ready to go on request.
