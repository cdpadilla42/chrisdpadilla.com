import Image from 'next/image';
import { CMS_NAME } from '../lib/constants';

export default function Intro() {
  return (
    <header>
      <article className="intro">
        <div>
          <h1>Hey, I'm Chris!</h1>
          <p>
            I develop software , make music, and laugh lots. I live in Dallas
            Texas and love to make things. Come say hey!
          </p>
          <p className="hero_buttons">
            <a href="/about">More About me</a>
          </p>
        </div>
        <div className="headshot">
          <Image src="/assets/headshot.jpeg" width={500} height={500} />
        </div>
      </article>
    </header>
  );
}
