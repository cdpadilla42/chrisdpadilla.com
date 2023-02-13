import Link from 'next/link';
import { lowercaseFirstLetter } from '../lib/util';
import RssSvg from './rssSvg';

export default function Header({ section, tag }) {
  const blogHeader = () => (
    <>
      <Link href="/blog">
        <a>Blog</a>
      </Link>{' '}
      {tag && (
        <>
          <span className="header_divider">/</span>{' '}
          <Link href={`/blog/${lowercaseFirstLetter(tag)}`}>
            <a data-tag={tag} className="header_tag">
              {tag}
            </a>
          </Link>{' '}
        </>
      )}
    </>
  );

  const musicHeader = () => (
    <>
      <Link href="/music">
        <a>Music</a>
      </Link>
    </>
  );

  let trailingHeader = '.';

  if (section === 'blog') {
    trailingHeader = (
      <>
        <span className="header_divider">/</span>
        {blogHeader()}
      </>
    );
  } else if (section) {
    trailingHeader = (
      <>
        <span className="header_divider">/</span>
        {musicHeader()}
      </>
    );
  }

  return (
    <header className="header">
      <h1>
        <Link href="/">
          <a style={{ display: 'inline-block' }}>Chris Padilla</a>
        </Link>
        {trailingHeader}
      </h1>
    </header>
  );
}
