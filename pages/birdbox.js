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
        Bird Box is a simple toy music box! A delightful little app for playing
        with sound.
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
      <article className="center">
        <video
          preload="auto"
          loop
          type="video/mp4"
          playsInline
          controls
          className="center"
        >
          <source
            src="https://res.cloudinary.com/cpadilla/video/upload/v1746288919/chrisdpadilla/blog/video/birdboxscreencapcompressed_zrx447.mp4"
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
      <p>
        Android users!! I need your help. I need testers to run this through the
        ringer before it launches on the Google Play Store. If you want to
        participate,{' '}
        <Link href="/contact">
          <a>contact me by email</a>
        </Link>
        .
      </p>
    </Layout>
  );
};

export default About;
