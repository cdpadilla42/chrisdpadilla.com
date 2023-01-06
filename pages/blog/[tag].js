import React from 'react';
import Container from '../../components/container';
import Layout from '../../components/layout';
import { getAllPosts, getPrimaryTags } from '../../lib/api';
import Head from 'next/head';
import PostPreview from '../../components/post-preview';
import { filterBlogPosts } from '../../lib/util';
import Link from 'next/link';
import Header from '../../components/header';
import { techTags } from '../../lib/minorBlogTags';
import { useRouter } from 'next/router';

export default function Blog({ allPosts, tags }) {
  const primaryTags = tags.filter((tag) => !techTags.includes(tag));
  const router = useRouter();
  const { tag } = router.query;
  let renderedPosts = allPosts;
  if (tag) {
    renderedPosts = renderedPosts.filter((post) => post.tags.includes(tag));
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
        <Header section="blog" tag={tag} />
        <p>Take a look by topic:</p>
        <ul className="tagslist">
          {primaryTags.map((tag) => (
            <li className="tagslist_tag" data-tag={tag}>
              <Link href={`/blog?tag=${tag}`}>
                <a>{tag}</a>
              </Link>
            </li>
          ))}
        </ul>
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

  const tagsList = getPrimaryTags({ posts: publishedPosts });

  return {
    props: { allPosts: publishedPosts, tags: tagsList },
    // revalidate: 14400,
  };
}
