import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';

export default function Intro({ latestHap }) {
  return (
    <header>
      <article className="intro">
        <div>
          <h1>Hey, I'm Chris!</h1>
          <p>
            By day, I <Link href="/software">develop software</Link>. By night,
            I <Link href="/music">play music</Link>. I also{' '}
            <Link href="/blog">write about both</Link>. I laugh lots all hours
            of the day. I live in Dallas, Texas and love to make things. Come
            say hey!
          </p>
          <p className="hero_buttons">
            <Link href="/about">More about me</Link> —{' '}
            <Link href="/contact">Contact me</Link> —{' '}
            <Link href="/now">What I'm Doing Now</Link>
          </p>
        </div>
        <div className="headshot">
          <Image
            src="/assets/headshot-blue.jpg"
            width={500}
            height={500}
            style={{ maxWidth: '100%', height: 'auto', minWidth: '200px' }}
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
