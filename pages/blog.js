import React from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import { getAllPosts } from '../lib/api';
import Head from 'next/head';
import PostPreview from '../components/post-preview';
import { filterBlogPosts } from '../lib/util';
import RssSvg from '../components/rssSvg';
import Header from '../components/header';

export default function Blog({ allPosts, tags }) {
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

export async function getServerSideProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'hidden',
    'tags',
  ]);

  const publishedPosts = allPosts.filter(filterBlogPosts);

  const tagsObj = publishedPosts.reduce((res, currentPost) => {
    const currentTags = currentPost.tags;
    currentTags.forEach((tag) => {
      if (!res[tag]) {
        res[tag] = true;
      }
    });
    return res;
  }, {});

  const tagsList = Object.keys(tagsObj);

  return {
    props: { allPosts: publishedPosts, tags: tagsList },
    // revalidate: 14400,
  };
}
