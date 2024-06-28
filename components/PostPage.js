import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Container from '../components/container';
import Header from '../components/header';
import PostTitle from '../components/post-title';
import Head from 'next/head';
import PostHeader from '../components/post-header';
import PostBody from '../components/post-body';
import Link from 'next/link';
import { primaryTags } from '../lib/minorBlogTags';
import { EMAIL } from '../lib/constants';

export default function Post({ post, morePosts, preview, prelude }) {
  const router = useRouter();
  const postPrimaryTags = post.tags.filter((tag) => primaryTags.includes(tag));
  let pageTag;
  if (postPrimaryTags.length >= 1) {
    pageTag = postPrimaryTags[0];
  }
  return (
    <Layout
      preview={preview}
      customOGImage={post.ogImage}
      title={`${post.title} | Chris Padilla`}
    >
      <Container>
        <Header section="blog" tag={pageTag} />
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
                prelude={prelude}
              />
              <PostBody content={post.content} />
            </article>
            <aside className="article_end">
             <p>
              <strong>Thank you for reading!</strong> I'd love to hear your
              thoughts. Feel free to{' '}
              <a href={`mailto:${EMAIL}?subject=${post.title}`}>email me</a> or{' '}
              <Link href="/contact">
                <a>find me on the socials</a>
              </Link>!{' '}
              You can also follow by{' '}
              <Link href="/api/feed">
                <a>RSS</a>
              </Link>
              ! (<a href="https://aboutfeeds.com/">What's RSS?</a>)
              </p>
            </aside>
            <script src="../"></script>
          </>
        )}
      </Container>
    </Layout>
  );
}
