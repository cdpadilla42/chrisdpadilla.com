import React from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import { getAllPosts } from '../lib/api';
import Head from 'next/head';
import { filterBlogPosts } from '../lib/util';
import Header from '../components/header';
import Image from 'next/image';
import SpectrumImg from '../public/assets/albums/SpectrumCover.jpg';
import Link from 'next/link';

export default function Blog({ allPosts }) {
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
        <section>
          <h2>Latest Release</h2>
          <article>
            <Link href="https://letsgochris.bandcamp.com/album/spectrum">
              <a>
                <Image
                  src={SpectrumImg}
                  alt="Cover art for Spectrum. Photo of Lady Bird Lake."
                />
              </a>
            </Link>
          </article>
        </section>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'hidden',
  ]);

  const publishedPosts = allPosts.filter(filterBlogPosts);

  return {
    props: { allPosts: publishedPosts },
  };
}
