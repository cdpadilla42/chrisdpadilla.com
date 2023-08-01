import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { getAllPosts, getLatestAlbum } from '../lib/api';
import { filterBlogPosts } from '../lib/util';
import featuredPostsSlugs from '../lib/featuredPosts';
import ACNMPromo2 from '../public/assets/projects/ACNM/ACNMpromo2.jpg';
import { useEffect } from 'react';

export default function Index({ latestPosts, featuredPosts, latestAlbum }) {
  // useEffect(async () => {
  //   try {
  //     const response = await fetch(
  //       // TODO URL Here
  //       'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
  //     );
  //     const json = await response.json();

  //     console.log(json.url);
  //     console.log(json.explanation);
  //   } catch (error) {
  //     console.log(error.response.body);
  //   }
  // }, []);
  return (
    <Layout>
      <Head>
        <title>Chris Padilla — Developer & Musician</title>
      </Head>
      <Container>
        <Intro />
        <section>
          <MoreStories
            latestPosts={latestPosts}
            featuredPosts={featuredPosts}
          />
          <div className="heading_flex">
            <h2>Latest Music</h2>
            <Link href="/music" legacyBehavior>
              <a>
                <h2>See All</h2>
              </a>
            </Link>
          </div>
          <article>
            <Link href={`/${latestAlbum.slug}`} legacyBehavior>
              <a>
                <Image
                  src={latestAlbum.coverURL}
                  alt={`Cover art for ${latestAlbum.title}.`}
                  width="800"
                  height="800"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </a>
            </Link>
          </article>
          <div className="heading_flex">
            <h2>
              <Link href="/acnm" legacyBehavior>
                <a>I MADE A GAME — AC: NEW MURDER</a>
              </Link>
            </h2>
          </div>
          <article>
            <Link href="/acnm" legacyBehavior>
              <a style={{ width: '100%' }}>
                <Image
                  src={ACNMPromo2}
                  alt={`Promo banner for AC: New Mureder`}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </a>
            </Link>
          </article>
        </section>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'hidden', 'tags'], {
    filter: filterBlogPosts,
    convertContentToHtml: true,
  });

  const latestPosts = allPosts.slice(0, 6);

  const featuredPostsList = featuredPostsSlugs.map((featuredSlug) =>
    allPosts.find((post) => post.slug === featuredSlug)
  );

  const latestAlbum = getLatestAlbum();

  return {
    props: { latestPosts, featuredPosts: featuredPostsList, latestAlbum },
  };
}
