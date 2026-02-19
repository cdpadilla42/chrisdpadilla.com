import React from 'react';
import Head from 'next/head';
import Container from '../components/container';
import Layout from '../components/layout';
import Header from '../components/header';
import FullPostPreviews from '../components/FullPostPreviews';
import { filterBlogPosts, paginateArray } from '../lib/util';
import { FULL_POST_PAGE_LIMIT } from '../lib/constants';
import postsMetadata from '../public/posts-metadata.json';

export default function Studio({ posts, count }) {
  return (
    <Layout>
      <Head>
        <title>Studio | Chris Padilla</title>
        <meta property="og:title" content="Studio | Chris Padilla" />
      </Head>
      <Container>
        <Header section="studio" />
        <p>A curated selection of my favorite recordings.</p>
        <hr />
        {posts.length > 0 && (
          <FullPostPreviews posts={posts} count={count} />
        )}
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const page = context.query?.p || 1;
  const allPosts = postsMetadata.filter(filterBlogPosts);

  const studioPosts = allPosts.filter((post) =>
    post.tags?.some((t) => t === 'Studio')
  );

  const count = studioPosts.length;
  const paginatedPosts = paginateArray(studioPosts, page, FULL_POST_PAGE_LIMIT);

  return {
    props: { posts: paginatedPosts, count },
  };
}
