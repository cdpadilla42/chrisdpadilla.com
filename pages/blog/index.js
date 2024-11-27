import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { getAllPosts, getPostsCount } from '../../lib/api';
import Layout from '../../components/layout';
import Container from '../../components/container';
import { filterBlogPosts } from '../../lib/util';
import Header from '../../components/header';
import TagsNav from '../../components/TagsNav';
import FullPostPreviews from '../../components/FullPostPreviews';
import BlogPageIntro from './blogPageIntro';

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
        <p>
          <BlogPageIntro />
          You can follow by{' '}
          {/* <Link href="/subscribe">
            <a>Newsletter</a>
          </Link>{' '}or{' '} */}
          <Link href="/api/feed">
            <a>RSS</a>
          </Link>
          ! (<a href="https://aboutfeeds.com/">What's RSS?</a>) Full archive{' '}
          <Link href="/blog/list">
            <a>here</a>
          </Link>
          .
        </p>
        <TagsNav />
        <FullPostPreviews posts={renderedPosts} count={count} />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const page = context.query.p || 1;
  const count = getPostsCount();

  const skip = (page - 1) * 5;
  const allPosts = getAllPosts(
    [
      'title',
      'date',
      'slug',
      'author',
      'coverImage',
      'excerpt',
      'hidden',
      'tags',
      'content',
    ],
    {
      skip,
      limit: 5,
    }
  );

  const publishedPosts = allPosts.filter(filterBlogPosts);

  return {
    props: { allPosts: publishedPosts, count },
    // revalidate: 14400,
  };
}
