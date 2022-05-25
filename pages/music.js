import React from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import Head from 'next/head';
import Header from '../components/header';

import Link from 'next/link';
import MusicGrid from '../components/MusicGrid';

export default function Music({ allPosts }) {
  return (
    <Layout>
      <Head>
        <title>Music | Chris Padilla</title>
      </Head>
      <Header />
      <Container>
        <h1>Music.</h1>
        <p>
          All of my newly composed music is on{' '}
          <a
            href="https://letsgochris.bandcamp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            bandcamp
          </a>
          .
        </p>
        <p>
          You can{' '}
          <Link href="/sax">
            <a>hear my saxophone playing here</a>
          </Link>
          .
        </p>
        <MusicGrid />
      </Container>
    </Layout>
  );
}
