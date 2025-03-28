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
      {/* <div className="center">
        <Image
          src="https://res.cloudinary.com/cpadilla/image/upload/v1695238745/chrisdpadilla/site/acnmfrontpage_sza4ub.png"
          alt="AC: New Mureder Start Page"
          width={500}
          height={500}
        />
      </div> */}

      <h2>I Made A Game!</h2>
      <p>
        Bird Box is a music app where you can unlock songs by singing certain
        melodies with the Toucan!
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
        </Link>{' '}
        .
      </p>
    </Layout>
  );
};

export default About;
