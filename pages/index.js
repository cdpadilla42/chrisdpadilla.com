import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { getAllPosts } from '../lib/api';
import SpectrumImg from '../public/assets/albums/SpectrumCover.jpg';
import { filterBlogPosts } from '../lib/util';

export default function Index({ allPosts }) {
  return (
    <Layout>
      <Head>
        <title>Chris Padilla — Full Stack Developer</title>
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
        {allPosts.length > 0 && <MoreStories posts={allPosts} />}
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const allPosts = getAllPosts(
    [
      'title',
      'date',
      'slug',
      'author',
      'coverImage',
      'excerpt',
      'hidden',
      'content',
    ],
    {
      filter: filterBlogPosts,
      convertContentToHtml: true,
    }
  );

  return {
    props: { allPosts },
    // revalidate: 14400,
  };
}
