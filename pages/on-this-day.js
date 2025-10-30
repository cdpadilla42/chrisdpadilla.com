import React from 'react';
import Head from 'next/head';
import Container from '../components/container';
import Layout from '../components/layout';
import Header from '../components/header';
import PostPreview from '../components/post-preview';
import { getAllPosts, getPrimaryTags } from '../lib/api';
import { filterBlogPosts } from '../lib/util';
import { getOnThisDayPosts } from '../lib/onThisDay';
import { format } from 'date-fns';

export default function OnThisDay({ posts, rangeDays, totalFound, currentDate }) {
  const dateDisplay = format(new Date(currentDate), 'MMMM d');

  return (
    <Layout>
      <Head>
        <title>On This Day - Chris Padilla</title>
        <meta
          name="description"
          content={`Blog posts written on ${dateDisplay} throughout the years`}
        />
      </Head>
      <Container>
        <Header section="blog" />
        <h2>On This Day</h2>

        <aside>
          <p>
            Posts published on <strong>{dateDisplay}</strong>
            {rangeDays > 0 && ` (±${rangeDays} day${rangeDays > 1 ? 's' : ''})`}.
          </p>
        </aside>

        <hr />

        {posts.length > 0 ? (
          <ul className="bloglist">
            {posts.map((post) => (
              <PostPreview
                key={post.slug}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                slug={post.slug}
                excerpt={post.excerpt}
                tags={post.tags}
              />
            ))}
          </ul>
        ) : (
          <p>No posts found for this day.</p>
        )}
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const allPosts = getAllPosts(
    ['title', 'date', 'slug', 'coverImage', 'excerpt', 'hidden', 'tags'],
    { filter: filterBlogPosts }
  );

  const { posts, rangeDays, totalFound } = getOnThisDayPosts(allPosts);

  return {
    props: {
      posts,
      rangeDays,
      totalFound,
      currentDate: new Date().toISOString(),
    },
  };
}
