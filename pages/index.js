import Container from '../components/container';
import MoreStories from '../components/more-stories';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { getAllPosts } from '../lib/api';
import Head from 'next/head';
import { filterBlogPosts } from '../lib/util';
import Link from 'next/link';
import Image from 'next/image';
import SpectrumImg from '../public/assets/albums/SpectrumCover.jpg';

export default function Index({ allPosts }) {
  return (
    <Layout>
      <Head>
        <title>Chris Padilla — Full Stack Developer</title>
      </Head>
      <Container>
        <Intro />
        {allPosts.length > 0 && <MoreStories posts={allPosts} />}
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
            <Link href="https://letsgochris.bandcamp.com/album/spectrum">
              <a target="_blank" rel="noopener noreferrer">
                <Image
                  src={SpectrumImg}
                  alt="Cover art for Spectrum. Photo of Lady Bird Lake."
                />
              </a>
            </Link>
          </article>
        </section>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'hidden',
  ]);

  const publishedPosts = allPosts.filter(filterBlogPosts);

  return {
    props: { allPosts: publishedPosts },
  };
}
