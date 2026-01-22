import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { HOME_TOWN } from '../lib/constants';

export default function Intro({ latestHap }) {
  return (
    <header>
      <article className="intro">
        <div className="intro-text">
          <h1>Hey, I'm Chris!</h1>
          <p>
            By day, I{' '}
            <Link href="/blog/tech">
              <a>develop software</a>
            </Link>
            . By night, I{' '}
            <Link href="/music">
              <a>play music</a>
            </Link>{' '}
            and{' '}
            <Link href="/blog/art">
              <a>make pictures</a>
            </Link>
            . I also <Link href="/blog">write about it all on my blog</Link>. I
            laugh all hours of the day. I live in {HOME_TOWN} and love to make
            things.
          </p>
          <p className="hero_buttons">
            <Link href="/about">
              <a>More about me</a>
            </Link>{' '}
            —{' '}
            <Link href="/contact">
              <a>Contact me</a>
            </Link>{' '}
            —{' '}
            <Link href="/now">
              <a>What I'm Doing Now</a>
            </Link>{' '}
            {/* —{' '}
            <Link href="/subscribe">
              <a>Newsletter</a>
            </Link> */}
          </p>
        </div>
        <div className="headshot">
          <Image
            src="https://padilla-media.s3.amazonaws.com/blog/images/headshot-blue.jpg"
            width={500}
            height={500}
          />
        </div>
      </article>
    </header>
  );
}

Intro.propTypes = {
  latestHap: PropTypes.string,
};

Intro.defaultProps = {
  latestHap: '/blog/notes',
};
