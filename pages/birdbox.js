import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Header from '../components/header';
import Layout from '../components/layout';
import {
  BIRD_BOX_APP_STORE_URL,
  BIRD_BOX_PLAY_STORE_URL,
  BIRD_BOX_URL,
} from '../lib/constants';

const About = () => {
  return (
    <Layout>
      <Head>
        <title>Bird Box | Chris Padilla</title>
      </Head>
      <Header />
      <h1>Bird Box</h1>
      <div className="center">
        <Image
          src="https://padilla-media.s3.amazonaws.com/albums/covers/bird-box-ost.jpg"
          alt="Bird Box"
          width={500}
          height={500}
        />
      </div>
      <h2>I Made An App!</h2>
      <ul>
        <li>
          <Link href={BIRD_BOX_APP_STORE_URL}>
            <a target="_blank" rel="noopener noreferrer">
              Download from the iOS App Store
            </a>
          </Link>
        </li>
        <li>
          <Link href={BIRD_BOX_PLAY_STORE_URL}>
            <a target="_blank" rel="noopener noreferrer">
              Download from the Google Play Store
            </a>
          </Link>
        </li>
        <li>
          <Link href="/birdboxost">Listen to the OST (Spoilers!)</Link>
        </li>
      </ul>
      <p>
        Bird Box is a toy music box! A delightful little app for playing with
        sound.
      </p>
      <p>
        When I first played Ocarina of Time, I would just spend ages fooling
        around with the ocarina. Inspired by that simple pleasure of making
        sounds, I took the opportunity to use{' '}
        <Link href="https://reactnative.dev/">
          <a target="_blank" rel="noopener noreferrer">
            React Native
          </a>
        </Link>{' '}
        to bring my own app to life!
      </p>

      <article className="center markdown">
        <video
          preload="auto"
          loop
          type="video/mp4"
          playsInline
          controls
          className="center"
        >
          <source
            src="https://padilla-media.s3.amazonaws.com/blog/video/birdboxscreencapcompressed.mp4"
            type="video/mp4"
          />
        </video>
      </article>
      <p>
        Bird Box comes with a songbook. If you can play the few themes by ear,
        our feathered friend will recognize the tune and perform the entire song
        for you!
      </p>
      <p>
        You can download Bird Box for free from{' '}
        <Link href={BIRD_BOX_APP_STORE_URL}>
          <a target="_blank" rel="noopener noreferrer">
            the iOS App Store
          </a>
        </Link>{' '}
        and{' '}
        <Link href={BIRD_BOX_PLAY_STORE_URL}>
          <a target="_blank" rel="noopener noreferrer">
            the Google Play Store
          </a>
        </Link>
        . You can visit the game{' '}
        <Link href={BIRD_BOX_URL}>
          <a target="_blank" rel="noopener noreferrer">
            in your desktop browser
          </a>
        </Link>
        , though I've found the mobile app performs best.
      </p>
      <p>
        Spoil the game by listening to{' '}
        <Link href="/birdboxost">
          <a>the OST here</a>
        </Link>
        !
      </p>
    </Layout>
  );
};

export default About;
