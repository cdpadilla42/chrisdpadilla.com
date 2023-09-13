import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Container from '../../components/container';
import Layout from '../../components/layout';
import { getAllArtImages, getAllPosts } from '../../lib/api';
import PostPreview from '../../components/post-preview';
import { capitalizeFirstLetter, filterBlogPosts } from '../../lib/util';
import Header from '../../components/header';
import { primaryTags } from '../../lib/minorBlogTags';
import TagsNav from '../../components/TagsNav';
import Blog404 from '../../components/Blog404';
import ArtGrid from '/components/ArtGrid';
import FullPostPreviews from '../../components/FullPostPreviews';

export default function Blog({ allPosts, images, count }) {
  const router = useRouter();
  const { tag, grid: gridFromQueryParams } = router.query;

  const renderedPosts = allPosts;
  const capitalizedTag = capitalizeFirstLetter(tag);

  const showGrid = tag === 'art' && gridFromQueryParams;
  const showFullPost = tag === 'music' || (tag === 'art' && !showGrid);
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
        <p>Take a look by topic:</p>
        <TagsNav />
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
  // Art Grid

  if (context.query.grid) {
    const images = getAllArtImages().slice(0, 30);
    return {
      props: { images },
      // revalidate: 14400,
    };
  }

  // Category Page

  const allPostFields = [
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'hidden',
    'tags',
  ];

  const page = context.query?.p || 1;
  let limit = null;

  if (context.params.tag === 'art' || context.params.tag === 'music') {
    allPostFields.push('content');
    limit = 5;
  }
  const allPosts = getAllPosts(allPostFields);

  const capitalizedTag = capitalizeFirstLetter(context.params.tag);
  const regex = new RegExp(capitalizedTag, 'i');
  const publishedPosts = allPosts.filter(filterBlogPosts);

  const skip = (page - 1) * 5;

  let resPosts = publishedPosts.filter((post) =>
    post.tags.some((e) => regex.test(e))
  );

  const count = resPosts.length;
  if (limit) {
    resPosts = resPosts
      // Skip
      .slice(skip)
      // Limit
      .slice(0, 5);
  }

  return {
    props: { allPosts: resPosts, count },
    // revalidate: 14400,
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
//     fallback: 'blocking',
//   };
// }
