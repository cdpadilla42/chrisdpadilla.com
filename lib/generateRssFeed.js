import { Feed } from 'feed';
import { BASE_URL, BASE_URL_DEV, EMAIL, MUSIC_TWITTER_URL } from './constants';

export const generateRSSFeed = (posts) => {
  const baseUrl =
    process.env.NODE_ENV === 'production' ? BASE_URL : BASE_URL_DEV;
  const author = {
    name: 'Chris Padilla',
    email: EMAIL,
    link: MUSIC_TWITTER_URL,
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

    const parsedTitle = typeof title !== 'string' ? `${title}` : title;

    const contentWithFooter = content + generateRSSFooter(title);

    feed.addItem({
      title: parsedTitle,
      id: url,
      link: url,
      // description,
      content: contentWithFooter,
      author: [author],
      date: new Date(date),
    });
  });

  // Write the RSS output to a public file, making it
  // accessible at chrisdpadilla.com/rss.xml
  // fs.writeFileSync('public/rss.xml', feed.rss2());

  return feed.rss2();
};

const generateRSSFooter = (title) => `
<hr />
<aside className="article_end">
<strong>Thank you for reading through RSS!</strong> I'd love to hear your thoughts. Feel free to  <a href="mailto:${EMAIL}?subject=${
  title || 'Re: Blog'
}">email me</a> or <a href="${BASE_URL}/contact">find me on the socials</a>!
</aside>
`;
