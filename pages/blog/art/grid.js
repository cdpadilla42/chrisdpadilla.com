import React from 'react';
import Head from 'next/head';
import Container from '../../../components/container';
import Layout from '../../../components/layout';
import Header from '../../../components/header';
import ArtGrid from '../../../components/ArtGrid';
import TagsNav from '../../../components/TagsNav';
import { getAllArtImages } from '../../../lib/api';
import { capitalizeFirstLetter, filterBlogPosts, lowercaseFirstLetter } from '../../../lib/util';
import { ART_SUB_TAGS } from '../../../lib/constants';
import postsMetadata from '../../../public/posts-metadata.json';

export default function ArtGridPage({ images }) {
  return (
    <Layout>
      <Head>
        <title>Art Grid | Chris Padilla</title>
        <meta property="og:title" content="Art Grid | Chris Padilla" />
      </Head>
      <Container>
        <Header section="blog" tag="Art" />
        <aside>
          <TagsNav />
        </aside>
        <hr />
        <p>All art posts as a visual grid. Browse by theme:</p>
        <ul className="tagslist">
          {ART_SUB_TAGS.map((tag) => (
            <li className="tagslist_tag" data-tag={tag} key={tag}>
              <a href={`/blog/${lowercaseFirstLetter(tag)}`}>
                {capitalizeFirstLetter(tag)}
              </a>
            </li>
          ))}
        </ul>
        <hr />
        <div style={{ marginTop: '2rem' }}>
          <ArtGrid images={images} />
        </div>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const allPosts = postsMetadata.filter(filterBlogPosts);

  const images = getAllArtImages(allPosts, {
    filter: (post) => post.tags?.includes('Art'),
  });

  return {
    props: { images },
  };
}
