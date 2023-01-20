import React from 'react';
import Container from '../../components/container';
import Layout from '../../components/layout';
import Head from 'next/head';
import Header from '../../components/header';
import { getAlbums } from '../../lib/api';
import { kebabCase } from '../../lib/util';
import Blog404 from '../../components/Blog404';
import Link from 'next/link';

export default function Album({ album }) {
  const pageTitle = `${album.title} | Chris Padilla`;
  console.log(album);

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
            <Link href={album.link}>
              <a target="_blank" rel="noopener noreferrer">
                {/* <Image src={albumPhotos[album.title]} /> */}
                <span>Listen on Spotify</span>
              </a>
            </Link>
          </li>
        </ul>
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
