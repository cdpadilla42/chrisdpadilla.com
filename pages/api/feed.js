import { getRSSFeed } from '../../lib/api';

export default async function handler(req, res) {
  const xml = await getRSSFeed();
  res.setHeader('Content-Type', 'application/rss+xml');
  res.send(xml);
}
