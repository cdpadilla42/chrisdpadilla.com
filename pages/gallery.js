import React from 'react';
import Head from 'next/head';
import Container from '../components/container';
import Layout from '../components/layout';
import Header from '../components/header';
import ArtGrid from '../components/ArtGrid';
import { getAllArtImages } from '../lib/api';
import { filterBlogPosts } from '../lib/util';
import postsMetadata from '../public/posts-metadata.json';

export default function Gallery({ images }) {
  return (
    <Layout>
      <Head>
        <title>Gallery | Chris Padilla</title>
        <meta property="og:title" content="Gallery | Chris Padilla" />
      </Head>
      <Container>
        <Header section="gallery" />
        <p>
          A curated selection of my favorites. See all art posts on the{' '}
          <a href="/blog/art">art blog</a>.
        </p>
        <hr />
        <div style={{ marginTop: '2rem' }}>
          <ArtGrid images={images} />
        </div>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const allPosts = postsMetadata.filter(filterBlogPosts);

  const galleryPosts = allPosts.filter((post) =>
    post.tags?.some((t) => t === 'Gallery'),
  );

  const images = getAllArtImages(galleryPosts);

  return {
    props: { images },
  };
}
