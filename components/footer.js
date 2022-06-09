import Link from 'next/link';
import {
  MUSIC_TWITTER_URL,
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from '../lib/constants';

export default function Footer() {
  return (
    <footer>
      <span>© {new Date().getFullYear()} Chris Padilla</span>
      <br />
      <a href={MUSIC_TWITTER_URL} target="_blank" rel="noopener noreferrer">
        Twitter
      </a>{' '}
      •{' '}
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
        Github
      </a>{' '}
      •{' '}
      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
        Instagram
      </a>{' '}
      •{' '}
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>{' '}
    </footer>
  );
}
