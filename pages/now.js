import { getLatestHap } from '../lib/api';
import PostPage from '/components/PostPage';

export default function NowPage({ post }) {
  return <PostPage post={post} />;
}

export async function getStaticProps() {
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

  const metaDescription = await markdownToString(post.content);

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
