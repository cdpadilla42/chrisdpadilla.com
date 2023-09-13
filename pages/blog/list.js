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

export default function BlogList({ allPosts }) {
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
        <p>Writings on Tech, Music, and Creativity.</p>
        <p>
          Much of my technical writing is born from my{' '}
          <Link href="/software">
            <a>personal projects</a>
          </Link>
          .
        </p>
        <p>
          You can follow by{' '}
          <Link href="/api/feed">
            <a>RSS</a>
          </Link>
          ! (<a href="https://aboutfeeds.com/">What's RSS?</a>)
        </p>
        <p>Take a look by topic:</p>
        <TagsNav />
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
