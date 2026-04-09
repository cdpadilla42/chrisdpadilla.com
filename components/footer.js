import Link from 'next/link';
import { getActiveSocials } from '../lib/socials';

export default function Footer() {
  const activeSocials = getActiveSocials();

  return (
    <footer>
      <span>© 2022-{new Date().getFullYear()} Chris Padilla</span>
      <br />
      {/* <a href={MUSIC_TWITTER_URL} target="_blank" rel="noopener noreferrer">
        Twitter
      </a>{' '}
      •{' '}
      <a href={MASTODON_URL} target="_blank" rel="noopener noreferrer">
        Mastodon
      </a>{' '}
      •{' '} */}
      {/* <Link href="/subscribe">Newsletter</Link>{' '}
      •{' '} */}
      <Link href="/blog">Blog</Link> • <Link href="/music">Music</Link> •{' '}
      <Link href="/about">About</Link> • <Link href="/contact">Contact</Link> •{' '}
      <Link href="/api/feed">
        <a target="_blank" rel="noopener noreferrer">
          RSS
        </a>
      </Link>
      <br />
      <Link href="/learningresources">Learning Resources</Link> •{' '}
      <Link href="/bookshelf">Bookshelf</Link>
      <br />
      {activeSocials.map((social, index) => (
        <span key={social.id}>
          <a href={social.url} target="_blank" rel="noopener noreferrer">
            {social.label}
          </a>
          {index < activeSocials.length - 1 ? ' • ' : ''}
        </span>
      ))}
    </footer>
  );
}
