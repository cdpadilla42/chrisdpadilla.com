import Image from 'next/image';
import Link from 'next/link';

export default function Intro() {
  return (
    <header>
      <article className="intro">
        <div>
          <h1>Hey, I'm Chris!</h1>
          <p>
            By day, I{' '}
            <Link href="/projects">
              <a>develop software</a>
            </Link>
            . By night, I{' '}
            <Link href="/music">
              <a>play music</a>
            </Link>
            . I also <Link href="/blog">write about both</Link>. I laugh lots
            all hours of the day. I live in Dallas, Texas and love to make
            things. Come say hey!
          </p>
          <p className="hero_buttons">
            <Link href="/about">
              <a>More about me</a>
            </Link>{' '}
            —{' '}
            <Link href="/contact">
              <a>Contact me</a>
            </Link>
          </p>
        </div>
        <div className="headshot">
          <Image src="/assets/headshot-blue.jpg" width={500} height={500} />
        </div>
      </article>
    </header>
  );
}
