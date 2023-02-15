import AlbumPage from '/components/albumPage';
import {
  getPostBySlug,
  getAllPosts,
  getAlbumBySlug,
  getAlbums,
  getLatestHap,
} from '../lib/api';
import PostPage from '/components/PostPage';
import markdownToHtml from '../lib/markdownToHtml';

export default function SlugPage({ post, album }) {
  return <PostPage post={post} />;
}

export async function getStaticProps({ params }) {
  const post = getLatestHap([
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
