import Head from 'next/head';
import Link from 'next/link';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import Intro from '../components/intro';
import Layout from '../components/layout';
import ArtGrid from '../components/ArtGrid';
import { getAllArtImages, getAlbumBySlug, getAllPosts, getLatestAlbums } from '../lib/api';
import featuredArtSlugs from '../lib/featuredArt';
import featuredAlbumSlugs from '../lib/featuredAlbums';
import { filterBlogPosts } from '../lib/util';
import featuredPostsSlugs from '../lib/featuredPosts';
import LandingInteractive from '../components/LandingInteractive';
import LinksFeedLanding from '../components/links-feed-landing';

export default function Index({
  latestPosts,
  featuredPosts,
  latestAlbums,
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
            <h2>Music</h2>
            <Link href="/music">
              <a>
                <h2>See All</h2>
              </a>
            </Link>
          </div>
          <ArtGrid
            images={latestAlbums.map((album) => ({
              src: album.coverURL,
              slug: album.slug,
            }))}
            page="home"
          />
          <div className="heading_flex">
            <h2>Art</h2>
            <Link href="/gallery">
              <a>
                <h2>Gallery</h2>
              </a>
            </Link>
          </div>
          <ArtGrid images={images} page={'home'} />
          <LandingInteractive />
          <MoreStories
            latestPosts={latestPosts}
            featuredPosts={featuredPosts}
          />
          <div className="heading_flex">
            <h2>Learning Resources</h2>
            <Link href="/learningresources">
              <a>
                <h2>Visit</h2>
              </a>
            </Link>
          </div>
          <p>
            Dozens of books and online materials for learning music, art,
            programming, and living a creative life.
          </p>
          <div className="heading_flex">
            <h2>Bookshelf</h2>
            <Link href="/bookshelf">
              <a>
                <h2>Visit</h2>
              </a>
            </Link>
          </div>
          <p>Collection of books read and enjoyed.</p>
          <LinksFeedLanding />
        </section>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(
    ['title', 'date', 'slug', 'hidden', 'tags', 'content'],
    {
      filter: filterBlogPosts,
      convertContentToHtml: true,
    },
  );

  const allImages = getAllArtImages(allPosts);
  const images = featuredArtSlugs
    .map((slug) => allImages.find((img) => img.slug === slug))
    .filter(Boolean);

  const latestPosts = allPosts.slice(0, 6);

  const featuredPostsList = featuredPostsSlugs.map((featuredSlug) =>
    allPosts.find((post) => post.slug === featuredSlug),
  );

  const [latestAlbum] = getLatestAlbums(1);
  const featuredAlbumsList = featuredAlbumSlugs
    .map((slug) => getAlbumBySlug(slug))
    .filter(Boolean);
  const latestAlbums = [latestAlbum, ...featuredAlbumsList];

  return {
    props: {
      latestPosts,
      featuredPosts: featuredPostsList,
      latestAlbums,
      images,
    },
  };
}
