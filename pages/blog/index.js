import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import Container from '../../components/container';
import { filterBlogPosts, paginateArray } from '../../lib/util';
import Header from '../../components/header';
import TagsNav from '../../components/TagsNav';
import FullPostPreviews from '../../components/FullPostPreviews';
import BlogPageIntro from './blogPageIntro';
import { FULL_POST_PAGE_LIMIT } from '../../lib/constants';
import postsMetadata from '../../public/posts-metadata.json';

export default function Blog({ allPosts, count }) {
  const router = useRouter();
  const query = router.query;
  let renderedPosts = allPosts;

  if (query.tag) {
    renderedPosts = renderedPosts.filter((post) =>
      post.tags.includes(query.tag)
    );
  }

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
        <aside>
          <TagsNav />
          {/* You can follow by{' '}
          <Link href="/subscribe">
            <a>Newsletter</a>
          </Link>{' '}
          or{' '} */}
          You can follow by <Link href="/api/feed">
            <a>RSS</a>
          </Link>
          ! (<a href="https://aboutfeeds.com/">What's RSS?</a>) Full archive{' '}
          <Link href="/blog/list">
            <a>here</a>
          </Link>
          .<br />
          See posts from{' '}
          <Link href="/on-this-day">
            <a>today in history</a>
          </Link>
          .
        </aside>
        <BlogPageIntro />
        <hr />
        <FullPostPreviews posts={renderedPosts} count={count} />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const page = context.query.p || 1;

  // Load posts from pre-generated JSON instead of filesystem
  const allPosts = postsMetadata;
  const publishedPosts = allPosts.filter(filterBlogPosts);

  const count = publishedPosts.length;

  // Apply pagination
  const paginatedPosts = paginateArray(publishedPosts, page, FULL_POST_PAGE_LIMIT);

  return {
    props: { allPosts: paginatedPosts, count },
  };
}
