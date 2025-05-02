import React from 'react';
import LandingInteractiveItem from './LandingInteractiveItem';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingInteractive(props) {
  return (
    <>
      <div className="heading_flex">
        <h2>Interactive</h2>
      </div>

      <article className="interactive">
        {/* <LandingInteractiveItem
          name="Bird Box"
          description={
            <>
              A pleasant toy music box! A mobile app designed for playing with
              sound and learning melodies by ear. Playable on iOS and web.
            </>
          }
          image="http://res.cloudinary.com/cpadilla/image/upload/v1743372758/chrisdpadilla/albums/zwqx8tumg5iz7yigqgfo.jpg"
          link="/birdbox"
        /> */}
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
          image="http://res.cloudinary.com/cpadilla/image/upload/v1737414483/chrisdpadilla/albums/izyuwlz5nmfr1ciujauv.jpg"
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
          image="https://res.cloudinary.com/cpadilla/image/upload/t_optimize/chrisdpadilla/albums/acnmcover_krjrsy.jpg"
          link="/acnm"
        />
      </article>
    </>
  );
}
