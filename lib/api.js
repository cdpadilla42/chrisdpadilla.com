import { generateLinksRSSFeed, generateRSSFeed } from './generateRssFeed';
import { convertPostsContentToHtml } from './markdownToHtml';
import {
  filterBlogPosts,
  getImageValuesFromMarkdown,
  getInternalLinksFromMarkdown,
  slugify,
} from './util';
import { albums } from './albums';
import { softwareProjects } from './softwareProjects';
import { techTags } from './minorBlogTags';
import {
  getPagesFromDirectory,
  getPostBySlug,
  getPostSlugs,
} from './markdownAccess';
import { ART_SUB_TAGS } from './constants';
import { linksFeed } from './linksFeed';

export function getAllPosts(fields = [], options = {}) {
  const slugs = getPostSlugs();
  let posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // Filter false values (.DS_STORE)
    .filter((post) => post)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  if (options.filter) {
    posts = posts.filter(options.filter);
  }

  if (options.skip) {
    posts = posts.slice(options.skip);
  }

  if (options.limit) {
    posts = posts.slice(0, options.limit);
  }

  return posts;
}

export function getAllArtImages(allPosts, options = {}) {
  // Filter posts for art grid
  let posts = allPosts
    .filter((post) => !post.artGridIgnore)
    .filter((post) => {
      const targetTags = ['Art', ...ART_SUB_TAGS];
      return post.tags?.some((e) => targetTags.includes(e));
    });

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

export function getAllPostRefs(
  fields = ['content', 'slug', 'title', 'bookshelf'],
  options = {}
) {
  const slugs = getPostSlugs();
  let posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // Filter false values (.DS_STORE)
    .filter((post) => post)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  if (options.filter) {
    posts = posts.filter(options.filter);
  }

  const links = {};
  const bookLinks = {};
  posts.forEach((post) => {
    // Blog Links
    const postLinks = getInternalLinksFromMarkdown(post.content);
    postLinks.forEach((src) => {
      if (src && !src.includes('/')) {
        if (!links[src]) {
          links[src] = [];
        }
        if (!links[src].find((entry) => entry.slug === post.slug))
          links[src].push({
            slug: post.slug,
            title: post.title,
          });
      }
    });

    // Bookshelf links
    if (post?.bookshelf) {
      for (const bookSlug of post.bookshelf) {
        if (!bookLinks[bookSlug]) {
          bookLinks[bookSlug] = [];
        }
        bookLinks[bookSlug].push({
          slug: post.slug,
          title: post.title,
        });
      }
    }
  });

  return [links, bookLinks];
}

export const getPostsCount = () => {
  const slugs = getPostSlugs();
  let posts = slugs
    // Filter false values (.DS_STORE)
    .filter((post) => post)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts.length;
};

export async function getAllPostsWithConvertedContent(
  fields = ['content'],
  options = {}
) {
  const allPosts = getAllPosts(fields, options);
  const parsedPublishedPost = await convertPostsContentToHtml(allPosts);
  return parsedPublishedPost;
}

export const getAlbums = () => {
  if (!albums) return [];
  const initialAlbums = [...albums];

  const filteredAlbums =
    process.env.NODE_ENV === 'development'
      ? initialAlbums
      : initialAlbums.filter((album) => album.releaseDate < new Date());

  const strippedAlbums = filteredAlbums.map((album) => {
    const resAlbum = { ...album };
    if (resAlbum.releaseDate) delete resAlbum.releaseDate;
    const slug = slugify(album.title);
    resAlbum.slug = slug;
    return resAlbum;
  });

  return strippedAlbums;
};

export const getLatestHap = (fields = ['slug', 'tags']) => {
  const posts = getAllPosts(fields);
  const latestHap = posts.find((post) => post.tags.includes('Haps'));
  return latestHap;
};

export function getAllPages() {
  const fileNames = getPagesFromDirectory();

  const filteredFiles = fileNames.filter(
    (name) => !name.match(/404|_|\[|xml|index|api/)
  );
  const slugs = filteredFiles.map((name) => name.replace(/\.js$/, ''));

  return slugs;
}

export const getAlbumBySlug = (slug) => {
  const albums = getAlbums();
  const album = albums.find((album) => album.slug === slug) || null;
  return album;
};

export const getSoftwareProjects = () => {
  if (!softwareProjects) return [];

  return softwareProjects;
};

export const getTags = (postArg) => {
  const allPosts = postArg || getAllPosts(['tags']);

  const publishedPosts = allPosts.filter(filterBlogPosts);
  const tagsObj = publishedPosts.reduce((res, currentPost) => {
    const currentTags = currentPost.tags;
    currentTags.forEach((tag) => {
      if (!res[tag]) {
        res[tag] = true;
      }
    });
    return res;
  }, {});

  return Object.keys(tagsObj);
};

export const getPrimaryTags = (options = {}) => {
  const posts = options.posts;
  const tags = options.tags || getTags(posts);
  const primaryTags = tags.filter((tag) => !techTags.includes(tag));
  return primaryTags;
};

export const getLatestAlbum = () => {
  if (!albums) return [];
  const initialAlbums = [...albums];

  const latestAlbum =
    process.env.NODE_ENV === 'development'
      ? initialAlbums[0]
      : initialAlbums.find((album) => album.releaseDate <= new Date());

  const resAlbum = { ...latestAlbum };

  const slug = slugify(resAlbum.title);
  resAlbum.slug = slug;

  delete resAlbum.releaseDate;

  return resAlbum;
};

export const getLatestAlbums = (count = 3) => {
  if (!albums) return [];
  const initialAlbums = [...albums];

  const filteredAlbums =
    process.env.NODE_ENV === 'development'
      ? initialAlbums
      : initialAlbums.filter((album) => album.releaseDate <= new Date());

  const latestAlbums = filteredAlbums
    .filter((album) => !album.noShowOnHomepage)
    .sort((a, b) => b.releaseDate - a.releaseDate)
    .slice(0, count)
    .map((album) => {
      const resAlbum = {
        title: album.title,
        coverURL: album.coverURL,
        slug: slugify(album.title),
      };
      return resAlbum;
    });

  return latestAlbums;
};

export async function getRSSFeed() {
  const posts = await getAllPostsWithConvertedContent(
    [
      'title',
      'date',
      'slug',
      'author',
      'coverImage',
      'excerpt',
      'hidden',
      'content',
    ],
    {
      filter: filterBlogPosts,
      limit: 10,
    }
  );

  const feed = generateRSSFeed(posts);
  return feed;
}

export async function getLinksFeed() {
  const feed = await generateLinksRSSFeed(linksFeed);
  return feed;
}
