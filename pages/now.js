import { getLatestHap } from '../lib/api';
import PostPage from '/components/PostPage';
import NextLink from '../components/NextLink';

export default function NowPage({ post }) {
  const prelude = (
    <p style={{ color: 'grey' }}>
      (This is my{' '}
      <NextLink href="https://nownownow.com/about">Now Page</NextLink>!
      Occasional updates on what I'm up to.)
    </p>
  );
  return <PostPage post={post} prelude={prelude} />;
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
