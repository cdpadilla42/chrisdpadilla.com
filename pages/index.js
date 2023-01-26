import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { getAllPosts, getLatestAlbum } from '../lib/api';
import { filterBlogPosts } from '../lib/util';
import ACNMPromo2 from '../public/assets/projects/ACNM/ACNMpromo2.jpg';

export default function Index({ allPosts, latestAlbum }) {
  return (
    <Layout>
      <Head>
        <title>Chris Padilla — Developer & Musician</title>
      </Head>
      <Container>
        <Intro />
        <section>
          <MoreStories posts={allPosts} />
          <div className="heading_flex">
            <h2>Latest Music</h2>
            <Link href="/music">
              <a>
                <h2>See All</h2>
              </a>
            </Link>
          </div>
          <article>
            <Link href={`${latestAlbum.slug}`}>
              <a>
                <Image
                  src={latestAlbum.coverURL}
                  alt={`Cover art for ${latestAlbum.title}.`}
                  width="800"
                  height="800"
                />
              </a>
            </Link>
          </article>
          <div className="heading_flex">
            <h2>
              <Link href="/acnm">
                <a>I MADE A GAME — AC: NEW MURDER</a>
              </Link>
            </h2>
          </div>
          <article>
            <Link href="/acnm">
              <a>
                <Image
                  src={ACNMPromo2}
                  alt={`Promo banner for AC: New Mureder`}
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
  }).slice(0, 6);

  const latestAlbum = getLatestAlbum();

  return {
    props: { allPosts, latestAlbum },
  };
}
