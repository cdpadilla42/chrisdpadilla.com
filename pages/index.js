import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import Intro from '../components/intro';
import Layout from '../components/layout';
import ArtGrid from '../components/ArtGrid';
import { getAllArtImages, getAllPosts, getLatestAlbum } from '../lib/api';
import { filterBlogPosts } from '../lib/util';
import featuredPostsSlugs from '../lib/featuredPosts';
import LandingInteractive from '../components/LandingInteractive';
import LinksFeedLanding from '../components/links-feed-landing';

export default function Index({
  latestPosts,
  featuredPosts,
  latestAlbum,
  images,
}) {
  return (
    <Layout>
      <Head>
        <title>Chris Padilla — Developer, Musician, etc.</title>
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
            <Link href={`/${latestAlbum.slug}`}>
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
            <h2>Latest Art</h2>
            <Link href="/blog/art">
              <a>
                <h2>See All</h2>
              </a>
            </Link>
          </div>
          <ArtGrid images={images} page={'home'} />
          <LandingInteractive />
          <MoreStories
            latestPosts={latestPosts}
            featuredPosts={featuredPosts}
          />
          <LinksFeedLanding />
        </section>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'hidden', 'tags', 'content'], {
    filter: filterBlogPosts,
    convertContentToHtml: true,
  });

  const images = getAllArtImages(allPosts).slice(0, 6);

  const latestPosts = allPosts.slice(0, 6);

  const featuredPostsList = featuredPostsSlugs.map((featuredSlug) =>
    allPosts.find((post) => post.slug === featuredSlug)
  );

  const latestAlbum = getLatestAlbum();

  return {
    props: {
      latestPosts,
      featuredPosts: featuredPostsList,
      latestAlbum,
      images,
    },
  };
}
