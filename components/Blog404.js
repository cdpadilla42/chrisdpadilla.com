import React from 'react';
import Head from 'next/head';
import Layout from './layout';
import Container from './container';
import Header from './header';
import TagsNav from './TagsNav';

export default function Blog404({}) {
  return (
    <Layout>
      <Head>
        <title>Chris Padilla — Developer & Musician</title>
        <meta
          property="og:title"
          content="Chris Padilla — Developer & Musician"
        />
      </Head>
      <Container>
        <Header section="blog" />
        <p>No post found! Take a look by topic:</p>
        <TagsNav />
      </Container>
    </Layout>
  );
}
