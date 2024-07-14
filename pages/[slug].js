import AlbumPage from '/components/albumPage';
import { getAllPosts, getAlbumBySlug, getAlbums } from '../lib/api';
import { getPostBySlug } from '../lib/markdownAccess';
import PostPage from '/components/PostPage';
import markdownToHtml from '../lib/markdownToHtml';
import { promises as fs } from 'fs';
import { bookshelf } from '../lib/bookshelf';

export default function SlugPage({ post, album, pagesLinkingBackTo, bookshelf }) {
  if (post) return <PostPage post={post} pagesLinkingBackTo={pagesLinkingBackTo} bookshelf={bookshelf}/>;
  if (album) return <AlbumPage album={album} />;
}

export async function getStaticProps({ params }) {
  const album = getAlbumBySlug(params.slug);
  if (album) {
    const newAlbum = { ...album };

    const newDescription = await markdownToHtml(album.description);
    newAlbum.description = newDescription;

    return {
      props: { album: newAlbum },
      // revalidate: 14400,
    };
  }

  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'tags',
    'hidden',
    'bookshelf',
  ]);

  if (post) {
    const file = await fs.readFile(process.cwd() + '/_cache/backlinks.json', 'utf8');
    const backlinks = JSON.parse(file);
    let pagesLinkingBackTo = null;

    if (backlinks[params.slug]) {
      pagesLinkingBackTo = backlinks[params.slug];
    }
    
    return {
      props: {
        post,
        pagesLinkingBackTo,
        bookshelf,
      },
    };
  }

  return {
    notFound: true,
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);
  const albums = getAlbums();
  const slugs = [...albums, ...posts].map((contentObj) => contentObj.slug);

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: 'blocking',
  };
}
