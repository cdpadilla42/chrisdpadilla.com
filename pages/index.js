import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { getAllPosts, getLatestAlbum } from '../lib/api';
import { filterBlogPosts } from '../lib/util';
import SpectrumImg from '../public/assets/albums/SpectrumCover.jpg';
import LunarImg from '../public/assets/albums/lunar-cover-scaled.jpg';
import TekserveImg from '../public/assets/albums/tekservecoverlarge.jpg';

const albumPhotos = {
  'Tek Serve': TekserveImg,
  Lunar: LunarImg,
  Spectrum: SpectrumImg,
};

export default function Index({ allPosts, latestAlbum }) {
  return (
    <Layout>
      <Head>
        <title>Chris Padilla — Developer & Musician</title>
      </Head>
      <Container>
        <Intro />
        <section>
          <div className="heading_flex">
            <h2>Latest Music</h2>
            <Link href="/music">
              <a>
                <h2>See All</h2>
              </a>
            </Link>
          </div>
          <article>
            <Link href={latestAlbum.link}>
              <a target="_blank" rel="noopener noreferrer">
                <Image
                  src={albumPhotos[latestAlbum.title]}
                  alt={`Cover art for ${latestAlbum.title}.`}
                />
              </a>
            </Link>
          </article>
        </section>
        {allPosts.length > 0 && <MoreStories posts={allPosts} />}
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'hidden'], {
    filter: filterBlogPosts,
    convertContentToHtml: true,
  });

  const latestAlbum = getLatestAlbum();

  return {
    props: { allPosts, latestAlbum },
  };
}
