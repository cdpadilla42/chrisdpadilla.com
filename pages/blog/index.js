import React from 'react';
import Container from '../../components/container';
import Layout from '../../components/layout';
import { getAllPosts, getPostsCount } from '../../lib/api';
import Head from 'next/head';
import PostPreview from '../../components/post-preview';
import { filterBlogPosts } from '../../lib/util';
import Link from 'next/link';
import Header from '../../components/header';
import { primaryTags } from '../../lib/minorBlogTags';
import { useRouter } from 'next/router';
import TagsNav from '../../components/TagsNav';
import PostHeader from '../../components/post-header';
import PostBody from '../../components/post-body';

export default function Blog({ allPosts, count }) {
  const router = useRouter();
  const query = router.query;
  let renderedPosts = allPosts;
  const currentPage = parseInt(query.p) || 1;

  const lastPage = Math.ceil(count / 5 - 1);
  console.log(lastPage);
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
          You can follow by{' '}
          <Link href="/api/feed">
            <a>RSS</a>
          </Link>
          ! (<a href="https://aboutfeeds.com/">What's RSS?</a>)
        </p>
        <TagsNav />
        <ul className="bloglist">
          {renderedPosts.length > 0 &&
            renderedPosts.map((post) => (
              <>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  tags={post.tags}
                  slug={post.slug}
                />
                <PostBody content={post.content} />
              </>
            ))}
        </ul>
        <div className="pagination-controller" style={{ display: 'flex' }}>
          <div className="left" style={{ flex: '1' }}>
            {currentPage !== 1 && (
              <Link href={`${router.pathname}?p=${currentPage - 1}`}>Back</Link>
            )}
          </div>
          <div className="right" style={{ flex: '1', textAlign: 'right' }}>
            {currentPage < lastPage && (
              <Link href={`${router.pathname}?p=${currentPage + 1}`}>Next</Link>
            )}
          </div>
        </div>
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
