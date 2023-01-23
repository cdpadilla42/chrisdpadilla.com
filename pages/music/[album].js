import React, { useState } from 'react';
import Container from '../../components/container';
import Layout from '../../components/layout';
import Head from 'next/head';
import Header from '../../components/header';
import { getAlbums } from '../../lib/api';
import Link from 'next/link';
import Image from 'next/image';

export default function Album({ album }) {
  const [showTracks, setShowTracks] = useState(false);
  const pageTitle = `${album.title} | Chris Padilla`;
  console.log(album);

  const renderShowTracksButton = () => {
    const text = showTracks ? 'Hide Tracks' : 'Show Tracks';
    return (
      <button
        type="button"
        onClick={() => setShowTracks(!showTracks)}
        style={{ width: '160px' }}
      >
        {text}
      </button>
    );
  };

  const renderTracks = () => {
    if (album.tracks) {
      return (
        <>
          {showTracks && <h3>Tracks</h3>}
          {showTracks &&
            album.tracks.map((track) => (
              <>
                <p>{track.title}</p>
                <p>
                  {' '}
                  <audio src={track.url} controls="controls" />
                </p>
              </>
            ))}
        </>
      );
    }
  };

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
      </Head>
      <Container>
        <Header section="music" />
        <h1>{album.title}</h1>
        <p>{album.description}</p>
        <Image
          src={album.coverURL}
          alt={`Cover art for ${album.title}.`}
          width="800"
          height="800"
        />
        <ul>
          <li>
            {' '}
            <Link href={album.link}>
              <a target="_blank" rel="noopener noreferrer">
                {/* <Image src={albumPhotos[album.title]} /> */}
                <span>
                  Support my music by purchasing the album on Bandcamp!
                </span>
              </a>
            </Link>
          </li>
          <li>
            {' '}
            <Link href={album.spotifyURL || ''}>
              <a target="_blank" rel="noopener noreferrer">
                {/* <Image src={albumPhotos[album.title]} /> */}
                <span>Listen on Spotify</span>
              </a>
            </Link>
          </li>
        </ul>
        {renderShowTracksButton()}
        {renderTracks()}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const albums = getAlbums();
  const album = albums.find((album) => album.slug === params.album) || null;
  if (!album) {
    return {
      notFound: true,
    };
  }

  console.log(album);

  return {
    props: { album },
    // revalidate: 14400,
  };
}

export async function getStaticPaths() {
  const albums = getAlbums();

  return {
    paths: albums.map((album) => {
      return {
        params: {
          album: album.slug,
        },
      };
    }),
    fallback: 'blocking',
  };
}
