import React from 'react';
import LandingInteractiveItem from './LandingInteractiveItem';
import Link from 'next/link';

export default function LandingInteractive(props) {
  return (
    <>
      <div className="heading_flex">
        <h2>Interactive</h2>
      </div>

      <article className="interactive">
        <LandingInteractiveItem
          name="Bird Box"
          description={
            <>
              A pleasant toy music box! A mobile app designed for playing with
              sound and learning melodies by ear. Playable on iOS, Android, and
              web.
            </>
          }
          image="https://padilla-media.s3.amazonaws.com/albums/covers/bird-box-ost.jpg"
          link="/birdbox"
        />
        <LandingInteractiveItem
          name="Amethyst"
          description={
            <>
              An interactive short story to accompany{' '}
              <Link href="/amethyst">
                <a>the liquid drum and bass album</a>
              </Link>
              . Playable in browser.
            </>
          }
          image="https://padilla-media.s3.amazonaws.com/albums/covers/amethyst.jpg"
          link="/amethyst-zone"
        />
        <LandingInteractiveItem
          name="AC: New Murder"
          description={
            <>
              A tribute game to Animal Crossing. Story and design by my sister
              Jenn, web app and music by your's truly!
            </>
          }
          image="https://padilla-media.s3.amazonaws.com/albums/covers/ac-new-murder-soundtrack.jpg"
          link="/acnm"
        />
      </article>
    </>
  );
}
