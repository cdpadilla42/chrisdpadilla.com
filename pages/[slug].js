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
  return (
    <Layout
      preview={preview}
      customOGImage={post.ogImage}
      title={`${post.title} | Chris Padilla`}
    >
      <Container>
        <Header section="blog" />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{post.title} | Chris Padilla</title>
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                tags={post.tags}
              />
              <PostBody content={post.content} />
            </article>
            <aside className="article_end">
              <strong>Thank you for reading!</strong> I'd love to hear your
              thoughts. Feel free to{' '}
              <Link href="/contact">
                <a>drop me a line</a>
              </Link>
              !
            </aside>
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

  if (!post) {
    return {
      notFound: true,
    };
  }

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
    fallback: 'blocking',
  };
}
