import { getLinksFeed } from '../../../lib/api';

export default async function handler(req, res) {
  const xml = await getLinksFeed();
  res.setHeader('Content-Type', 'application/rss+xml');
  res.send(xml);
}
