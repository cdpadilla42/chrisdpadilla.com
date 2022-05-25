import React from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import { getAllPosts } from '../lib/api';
import Head from 'next/head';
import { filterBlogPosts } from '../lib/util';
import Header from '../components/header';

export default function Blog({ allPosts }) {
  return (
    <Layout>
      <Head>
        <title>Contact | Chris Padilla</title>
      </Head>
      <Header />
      <Container>
        <h1>Contact.</h1>
        <p>
          You can reach me at <strong>cdpadilla42</strong> at{' '}
          <strong>gmail</strong> dot <strong>com</strong>. It's honeslty the
          most reliable way to get to me.
        </p>
        <p>I'm also on the socials:</p>
        <ul>
          <li>
            <a
              href="https://twitter.com/cpadilladevs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://github.com/cdpadilla42"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/chrisdpadilla/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/c.d.padilla/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
        </ul>
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
