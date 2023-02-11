import React from 'react';
import Container from '../../components/container';
import Layout from '../../components/layout';
import { getAllPosts } from '../../lib/api';
import Head from 'next/head';
import PostPreview from '../../components/post-preview';
import {
  capitalizeFirstLetter,
  filterBlogPosts,
  lowercaseFirstLetter,
} from '../../lib/util';
import Header from '../../components/header';
import { primaryTags } from '../../lib/minorBlogTags';
import { useRouter } from 'next/router';
import TagsNav from '../../components/TagsNav';
import Blog404 from '../../components/Blog404';

export default function Blog({ allPosts }) {
  const router = useRouter();
  const { tag } = router.query;
  const capitalizedTag = capitalizeFirstLetter(tag);
  const renderedPosts = allPosts.filter((post) =>
    post.tags.includes(capitalizedTag)
  );

  if (!renderedPosts.length) {
    return <Blog404 />;
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
        <Header section="blog" tag={capitalizedTag} />
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

export async function getStaticProps() {
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

export async function getStaticPaths() {
  return {
    paths: primaryTags.map((tag) => {
      const tagSlug = lowercaseFirstLetter(tag);
      return {
        params: {
          tag: tagSlug,
        },
      };
    }),
    fallback: 'blocking',
  };
}
