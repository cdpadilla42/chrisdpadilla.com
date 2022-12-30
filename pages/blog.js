import React from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import { getAllPosts } from '../lib/api';
import Head from 'next/head';
import PostPreview from '../components/post-preview';
import { filterBlogPosts } from '../lib/util';
import Link from 'next/link';
import Header from '../components/header';
import { techTags } from '../lib/minorBlogTags';

export default function Blog({ allPosts, tags }) {
  console.log(tags);
  const primaryTags = tags.filter((tag) => !techTags.includes(tag));

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
        <p>Take a look by topic:</p>
        <ul className="tagslist">
          {primaryTags.map((tag) => (
            <li className="tagslist_tag">{tag}</li>
          ))}
        </ul>
        <ul className="bloglist">
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
