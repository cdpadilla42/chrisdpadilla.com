import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Container from '../../components/container';
import Layout from '../../components/layout';
import { getAllArtImages } from '../../lib/api';
import PostPreview from '../../components/post-preview';
import {
  capitalizeFirstLetter,
  filterBlogPosts,
  paginateArray,
} from '../../lib/util';
import Header from '../../components/header';
import { primaryTags } from '../../lib/minorBlogTags';
import TagsNav from '../../components/TagsNav';
import Blog404 from '../../components/Blog404';
import ArtGrid from '/components/ArtGrid';
import FullPostPreviews from '../../components/FullPostPreviews';
import Link from 'next/link';
import TagIntro from './blogPageIntro';
import BlogPageIntro from './blogPageIntro';
import {
  ART_SUB_TAGS,
  FULL_POST_PAGE_LIMIT,
  FULL_POST_TAGS,
} from '../../lib/constants';
import postsMetadata from '../../public/posts-metadata.json';

const targetArtGridTags = ['art', ...ART_SUB_TAGS];

export default function Blog({ allPosts, images, count }) {
  const router = useRouter();
  const { tag, grid: gridFromQueryParams } = router.query;

  const renderedPosts = allPosts;
  const capitalizedTag = capitalizeFirstLetter(tag);

  // const showGrid = tag === 'art' && gridFromQueryParams;
  const showGrid = targetArtGridTags.includes(tag);
  const showFullPost =
    FULL_POST_TAGS.includes(tag) || (tag === 'art' && !showGrid);
  const showPreview = !showGrid && !showFullPost;

  if (!renderedPosts?.length && !showGrid) {
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
        <aside>
          <TagsNav />
          {/* Follow by{' '}
          <Link href="/subscribe">
            <a>Newsletter</a>
          </Link>{' '}
          or{' '} */}
          Follow by <Link href="/api/feed">
            <a>RSS</a>
          </Link>
          ! (<a href="https://aboutfeeds.com/">What's RSS?</a>) Full archive{' '}
          <Link href="/blog/list">
            <a>here</a>
          </Link>
          .<br />
          See posts from{' '}
          <Link href="/on-this-day">
            <a>today in history</a>
          </Link>
          .
        </aside>
        <BlogPageIntro tag={capitalizedTag} />
        <hr />
        {showFullPost && renderedPosts.length > 0 && (
          <FullPostPreviews posts={renderedPosts} count={count} />
        )}
        {showGrid && (
          <div style={{ marginTop: '2rem' }}>
            <ArtGrid images={images} />
          </div>
        )}
        {showPreview &&
          renderedPosts.length > 0 &&
          renderedPosts.map((post) => (
            <ul className="bloglist">
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
            </ul>
          ))}
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // Load posts from pre-generated JSON instead of filesystem
  const allPosts = postsMetadata;

  // Art Grid
  if (targetArtGridTags.includes(context.params.tag)) {
    const capitalizedTag = capitalizeFirstLetter(context.params.tag);

    const images = getAllArtImages(allPosts, {
      filter: (post) => post.tags.includes(capitalizedTag),
    });

    return {
      props: { images },
    };
  }

  // Category Page
  const page = context.query?.p || 1;
  const capitalizedTag = capitalizeFirstLetter(context.params.tag);
  const regex = new RegExp(`^${capitalizedTag}$`, 'i');

  const publishedPosts = allPosts.filter(filterBlogPosts);

  let resPosts = publishedPosts.filter((post) =>
    post.tags.some((e) => regex.test(e))
  );

  const count = resPosts.length;

  // Apply pagination for full post tags
  if (FULL_POST_TAGS.includes(context.params.tag)) {
    resPosts = paginateArray(resPosts, page, FULL_POST_PAGE_LIMIT);
  }

  return {
    props: { allPosts: resPosts, count },
  };
}

// export async function getStaticPaths() {
//   return {
//     paths: primaryTags.map((tag) => {
//       const tagSlug = lowercaseFirstLetter(tag);
//       return {
//         params: {
//           tag: tagSlug,
//         },
//       };
//     }),
//     fallback: true,
//   };
// }
