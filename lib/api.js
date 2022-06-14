import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { generateRSSFeed } from './generateRssFeed';
import { convertPostsContentToHtml } from './markdownToHtml';
import { filterBlogPosts } from './util';
import { albums } from './albums';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
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
    const resAlbum = { ...album };
    if (resAlbum.releaseDate) delete resAlbum.releaseDate;
    return resAlbum;
  });

  return strippedAlbums;
};

export const getLatestAlbum = () => {
  if (!albums) return [];
  const initialAlbums = [...albums];

  const latestAlbum =
    process.env.NODE_ENV === 'development'
      ? initialAlbums[0]
      : initialAlbums.find((album) => album.releaseDate < new Date());

  const resAlbum = { ...latestAlbum };
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
