import React from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import Head from 'next/head';
import Header from '../components/header';
import Link from 'next/link';
import { getActiveSocials } from '../lib/socials';

export default function Blog() {
  const activeSocials = getActiveSocials();

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
          {activeSocials.map((social) => (
            <li key={social.id}>
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                {social.label}
              </a>
            </li>
          ))}
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
        <p>
          You can also follow my{' '}
          <Link href="/links">
            <a>links</a>
          </Link>{' '}
          feed by{' '}
          <Link href="/api/links/feed">
            <a>RSS</a>
          </Link>
          .
        </p>
      </Container>
    </Layout>
  );
}
