import { getLatestHap } from '../lib/api';
import PostPage from '/components/PostPage';
import NextLink from '../components/NextLink';
import { bookshelf } from '../lib/bookshelf';

export default function NowPage({ post, bookshelf, }) {
  const prelude = (
    <p style={{ color: 'grey' }}>
      (This is my{' '}
      <NextLink href="https://nownownow.com/about">Now Page</NextLink>!
      Occasional updates on what I'm up to.)
    </p>
  );
  return <PostPage post={post} prelude={prelude} bookshelf={bookshelf}/>;
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
    'bookshelf',
  ]);

  if (post) {
    return {
      props: {
        post,
        bookshelf,
      },
    };
  }

  return {
    notFound: true,
  };
}
