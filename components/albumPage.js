import React, { useState } from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import Head from 'next/head';
import Header from '../components/header';
import { getAlbums } from '../lib/api';
import Link from 'next/link';
import Image from 'next/image';
import markdownToHtml from '../lib/markdownToHtml';
import Markdown from 'markdown-to-jsx';
import NextLink from '../components/NextLink';

export default function AlbumPage({ album }) {
  const [showTracks, setShowTracks] = useState(false);
  const pageTitle = `${album.title} | Chris Padilla`;

  const renderShowTracksButton = () => {
    const text = showTracks ? 'Hide Tracks' : 'Show Tracks';
    if (!album.tracks) return '';
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
        <div className="album_flex">
          <div className="album_text">
            <h1 className="album_text_heading">{album.title}</h1>
            <ul className="album_linkslist">
              <li>
                {' '}
                <Link
                  href={album.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-test="musicExternalLink">
                  
                    🤘 Purchase on Bandcamp
                  
                </Link>
              </li>
              {album.spotifyURL && (
                <li>
                  {' '}
                  <Link
                    href={album.spotifyURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-test="musicExternalLink">

                    <span>🙉 Listen on Spotify</span>

                  </Link>
                </li>
              )}
            </ul>
            <p>
              <Markdown
                options={{
                  overrides: {
                    a: NextLink,
                  },
                }}
              >
                {album.description}
              </Markdown>
            </p>
            {renderShowTracksButton()}
            {renderTracks()}
          </div>
          <div className="album_image">
            <Image
              src={album.coverURL}
              alt={`Cover art for ${album.title}.`}
              width="500"
              height="500"
            />
          </div>
        </div>
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

  const newAlbum = { ...album };

  const newDescription = await markdownToHtml(album.description);
  newAlbum.description = newDescription;

  return {
    props: { album: newAlbum },
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
