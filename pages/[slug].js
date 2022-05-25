import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getPostBySlug, getAllPosts } from '../lib/api';
import Layout from '../components/layout';
import Container from '../components/container';
import Header from '../components/header';
import PostTitle from '../components/post-title';
import Head from 'next/head';
import PostHeader from '../components/post-header';
import PostBody from '../components/post-body';
import Link from 'next/link';

export default function Post({ post, morePosts, preview }) {
  const router = useRouter();
  if ((!router.isFallback && !post?.slug) || post.hidden) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header
          section={
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          }
        />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{post.title} | Chris Padilla</title>
                <meta
                  property="og:image"
                  content={post.ogImage?.url || '/assets/headshot.jpeg'}
                />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                tags={post.tags}
              />
              <PostBody content={post.content} />
            </article>
            <script src="../"></script>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'tags',
    'hidden',
  ]);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
