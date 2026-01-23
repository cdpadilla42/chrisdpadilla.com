import React from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import Head from 'next/head';
import Header from '../components/header';
import { GITHUB_URL, LINKEDIN_URL } from '../lib/constants';
import Link from 'next/link';

export default function Blog() {
  return (
    <Layout noFooter>
      <Head>
        <title>Contact | Chris Padilla</title>
      </Head>
      <Header />
      <Container>
        <h1>Contact.</h1>
        <p>
          You can reach me at <strong>cdpadilla42</strong> at{' '}
          <strong>gmail</strong> dot <strong>com</strong>. It's the most
          reliable way to get to me.
        </p>
        {/* <p>
          You can join my{' '}
          <Link href="/subscribe">
            <a>newsletter</a>
          </Link>
          . I keep it very quiet — just a couple of updates a year on what I'm up
          to.
        </p> */}
        <p>I'm on a few socials:</p>
        <ul>
          {/* <li>
            <a
              href={MUSIC_TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a href={BLUESKY_URL} target="_blank" rel="noopener noreferrer">
              Bluesky
            </a>
          </li> */}
          <li>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          {/* <li>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li> */}
          <li>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
        <p>
          You can follow my{' '}
          <Link href="/blog">
            <a>blog</a>
          </Link>{' '}
          by{' '}
          <Link href="/api/feed">
            <a>RSS</a>
          </Link>
          . (<a href="https://aboutfeeds.com/">What's RSS?</a>)
        </p>
      </Container>
    </Layout>
  );
}
