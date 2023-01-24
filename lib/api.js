import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { generateRSSFeed } from './generateRssFeed';
import { convertPostsContentToHtml } from './markdownToHtml';
import { filterBlogPosts, kebabCase } from './util';
import { albums } from './albums';
import { softwareProjects } from './softwareProjects';
import { techTags } from './minorBlogTags';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) return false;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

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

  if (options.limit) {
    posts = posts.slice(0, options.limit);
  }

  return posts;
}

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
    console.log(album);
    const resAlbum = { ...album };
    if (resAlbum.releaseDate) delete resAlbum.releaseDate;
    const slug = kebabCase(album.title);
    resAlbum.slug = slug;
    return resAlbum;
  });

  return strippedAlbums;
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
      : initialAlbums.find((album) => album.releaseDate < new Date());

  const resAlbum = { ...latestAlbum };

  const slug = kebabCase(resAlbum.title);
  resAlbum.slug = slug;

  delete resAlbum.releaseDate;

  return resAlbum;
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
