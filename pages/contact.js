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
      <h1>Contact.</h1>
      <Container>
        <p>
          You can reach me at <strong>cdpadilla42</strong> at{' '}
          <strong>gmail</strong> dot <strong>com</strong>. It's honeslty the
          most reliable way to get to me.
        </p>
        <p>I'm also on the socials:</p>
        <ul>
          <li>
            <a href="https://twitter.com/cpadilladevs">Twitter</a>
          </li>
          <li>
            <a href="https://github.com/cdpadilla42">GitHub</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/chrisdpadilla/">LinkedIn</a>
          </li>
          <li>
            <a href="https://www.instagram.com/c.d.padilla/">Instagram</a>
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
