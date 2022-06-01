import { Feed } from 'feed';
import fs from 'fs';
import { BASE_URL, BASE_URL_DEV, EMAIL, TWITTER_URL } from './constants';

export const generateRSSFeed = (posts) => {
  const baseUrl =
    process.env.NODE_ENV === 'production' ? BASE_URL : BASE_URL_DEV;
  const author = {
    name: 'Chris Padilla',
    email: EMAIL,
    link: TWITTER_URL,
  };

  // Construct a new Feed object
  const feed = new Feed({
    title: 'Chris Padilla',
    description:
      'Developer by day, musician by night, human all hours of the day.',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    feedLinks: {
      rss2: `${baseUrl}/api/feed`,
    },
    author,
  });

  // Add each post to the feed
  posts.forEach((post) => {
    const {
      content,
      slug,
      date,
      title,
      // description,
    } = post;
    const url = `${baseUrl}/${slug}`;

    feed.addItem({
      title,
      id: url,
      link: url,
      // description,
      content,
      author: [author],
      date: new Date(date),
    });
  });

  // Write the RSS output to a public file, making it
  // accessible at chrisdpadilla.com/rss.xml
  // fs.writeFileSync('public/rss.xml', feed.rss2());

  return feed.rss2();
};
