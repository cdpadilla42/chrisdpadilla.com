import AlbumPage from '/components/albumPage';
import {
  getPostBySlug,
  getAllPosts,
  getAlbumBySlug,
  getAlbums,
} from '../lib/api';
import PostPage from '/components/PostPage';
import markdownToHtml from '../lib/markdownToHtml';

export default function SlugPage({ post, album }) {
  if (post) return <PostPage post={post} />;
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
  ]);

  if (post) {
    return {
      props: {
        post,
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
