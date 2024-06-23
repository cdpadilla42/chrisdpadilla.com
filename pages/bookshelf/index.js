import React from 'react';
import Container from '../../components/container';
import Layout from '../../components/layout';
import { getAllPosts } from '../../lib/api';
import Head from 'next/head';
import PostPreview from '../../components/post-preview';
import { filterBlogPosts } from '../../lib/util';
import Link from 'next/link';
import Header from '../../components/header';
import { primaryTags } from '../../lib/minorBlogTags';
import { useRouter } from 'next/router';
import TagsNav from '../../components/TagsNav';

export default function BookShelf({ allPosts }) {
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
        <title>Chris Padilla — Developer, Musician, etc.</title>
        <meta
          property="og:title"
          content="Chris Padilla — Developer & Musician"
        />
      </Head>
      <Container>
        <Header />
        <h2>Bookshelf</h2>
        <p>My words on other people's words.</p>
        <ul className="bloglist">
          {renderedPosts.length > 0 &&
            renderedPosts.map((post) => (
              <PostPreview
                key={post.slug}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                slug={post.slug}
                excerpt={post.excerpt}
                tags={post.tags.filter((tag) => primaryTags.includes(tag))}
              />
            ))}
        </ul>
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

  return {
    props: { allPosts: publishedPosts },
    // revalidate: 14400,
  };
}
