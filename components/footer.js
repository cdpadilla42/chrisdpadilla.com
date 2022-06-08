import {
  DEV_TWITTER_URL,
  GITHUB_URL,
  INSTAGRAM_URL,
  MUSIC_TWITTER_URL,
} from '../lib/constants';

export default function Footer() {
  return (
    <footer>
      <span>© {new Date().getFullYear()} Chris Padilla</span>
      <br />
      <a href={DEV_TWITTER_URL} target="_blank" rel="noopener noreferrer">
        Dev Twitter
      </a>{' '}
      •{' '}
      <a href={MUSIC_TWITTER_URL} target="_blank" rel="noopener noreferrer">
        Music Twitter
      </a>{' '}
      •{' '}
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
        Github
      </a>{' '}
      •{' '}
      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
        Instagram
      </a>{' '}
    </footer>
  );
}
