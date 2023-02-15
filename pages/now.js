import { getLatestHap } from '../lib/api';
import PostPage from '/components/PostPage';

export default function NowPage({ post }) {
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
