import React from 'react';
import Container from '../../components/container';
import Layout from '../../components/layout';
import { getAllPosts } from '../../lib/api';
import Head from 'next/head';
import PostPreview from '../../components/post-preview';

export default function Blog({ allPosts }) {
  return (
    <Layout>
      <Head>
        <title>Chris Padilla — Full Stack Developer</title>
      </Head>
      <h1>Blog.</h1>
      <Container>
        {allPosts.length > 0 &&
          allPosts.map((post) => (
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          ))}
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
  ]);

  return {
    props: { allPosts },
  };
}
