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
          I've been a musician for most of my life across several instruments.
          These days, I'm on guitar, piano, and music production. I love
          exploring genres and capturing atmsopheres through sound and story
          telling.{' '}
        </p>
        <p>
          All of my original music is on{' '}
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
          My biggest chapter has been in saxophone playing. You can{' '}
          <Link href="/sax">
            <a>🎷 hear my sax recordings here</a>
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
