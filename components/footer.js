import Link from 'next/link';
import {
  MUSIC_TWITTER_URL,
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  SPOTIFY_URL,
  BANDCAMP_URL,
  APPLE_MUSIC,
  MASTODON_URL,
  BLUESKY_YRL,
} from '../lib/constants';

export default function Footer() {
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
      {/* <Link href="/subscribe">
          Newsletter
      </Link>{' '}
      •{' '} */}
      <Link href="/blog">
          Blog
      </Link>{' '}
      •{' '}
      <Link href="/music">
          Music
      </Link>{' '}
      •{' '}
      <Link href="/about">
          About
      </Link>{' '}
      •{' '}
      <Link href="/contact">
          Contact
      </Link>{' '}
      •{' '}
      <Link href="/api/feed">
        <a target="_blank" rel="noopener noreferrer">
          RSS
        </a>
      </Link>
      <br />
      <a href={BANDCAMP_URL} target="_blank" rel="noopener noreferrer">
        Bandcamp
      </a>{' '}
      •{' '}
      <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer">
        Spotify
      </a>{' '}
      •{' '}
      <a href={APPLE_MUSIC} target="_blank" rel="noopener noreferrer">
        Apple Music
      </a><br/>
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
        Github
      </a>{' '}
      •{' '}
      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
        Instagram
      </a>{' '}
      •{' '}
      <a href={BLUESKY_YRL} target="_blank" rel="noopener noreferrer">
        Bluesky
      </a>{' '}
      •{' '}
      <a href={MUSIC_TWITTER_URL} target="_blank" rel="noopener noreferrer">
        Twitter
      </a>{' '}
      •{' '}
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>{' '}
    </footer>
  );
}
