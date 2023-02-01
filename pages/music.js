import React from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import Head from 'next/head';
import Header from '../components/header';
import Link from 'next/link';
import MusicGrid from '../components/MusicGrid';
import { getAlbums } from '../lib/api';

export default function Music({ albums }) {
  return (
    <Layout>
      <Head>
        <title>Music | Chris Padilla</title>
      </Head>
      <Container>
        <Header section="music" />
        <p>
          All of my newly composed music is on{' '}
          <a
            href="https://letsgochris.bandcamp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            🤘 Bandcamp
          </a>{' '}
          ,{' '}
          <a
            href="https://open.spotify.com/artist/3KNN2G4RReLVKbnIfTkRFf"
            target="_blank"
            rel="noopener noreferrer"
          >
            🙉 Spotify
          </a>{' '}
          and even{' '}
          <a
            href="https://music.apple.com/ph/artist/chris-padilla/1666663546"
            target="_blank"
            rel="noopener noreferrer"
          >
            🍎 Apple Music
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
        <MusicGrid albums={albums} />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const albums = getAlbums();

  return {
    props: {
      albums,
    },
  };
}
