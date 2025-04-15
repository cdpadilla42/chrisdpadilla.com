import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Header from '../components/header';
import Layout from '../components/layout';
import { BIRD_BOX_APP_STORE_URL, BIRD_BOX_URL } from '../lib/constants';

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
          src="http://res.cloudinary.com/cpadilla/image/upload/v1743372758/chrisdpadilla/albums/zwqx8tumg5iz7yigqgfo.jpg"
          alt="Bird Box"
          width={500}
          height={500}
        />
      </div>

      <h2>I Made An App!</h2>
      <p>
        Bird Box is a simple toy music box! You can also unlock hidden songs if
        you play the right notes.
      </p>
      <p>
        When I first played Ocarina of Time, I would just spend ages fooling
        around with the ocarina. Inspired by that simple pleasure of making
        sounds, I took the opportunity to learn just enough{' '}
        <Link href="https://reactnative.dev/">
          <a target="_blank" rel="noopener noreferrer">
            React Native
          </a>
        </Link>{' '}
        to bring my own app to life!
      </p>

      <p>
        There are currently a few hidden songs to discover. Playing a 6 note
        sequence will unlock the song. HINT: if you listen to{' '}
        <Link href="/birdboxost">
          <a>the OST</a>
        </Link>
        , you may be able to pick out the first few notes that start each song.
        ;)
      </p>

      <p>
        You can download Bird Box from{' '}
        <Link href={BIRD_BOX_APP_STORE_URL}>
          <a target="_blank" rel="noopener noreferrer">
            the iOS App Store
          </a>
        </Link>{' '}
        or visit the game{' '}
        <Link href={BIRD_BOX_URL}>
          <a target="_blank" rel="noopener noreferrer">
            in your desktop browser
          </a>
        </Link>
        .
      </p>
    </Layout>
  );
};

export default About;
