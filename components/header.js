import Link from 'next/link';
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
          <Link href={`/blog/${tag}`}>
            <a data-tag={tag} className="header_tag">
              {tag}
            </a>
          </Link>{' '}
        </>
      )}
    </>
  );

  return (
    <header className="header">
      <h1>
        <Link href="/">
          <a>Chris Padilla</a>
        </Link>
        {section === 'blog' ? (
          <>
            <span className="header_divider">/</span>
            {blogHeader()}
          </>
        ) : (
          '.'
        )}
      </h1>
    </header>
  );
}
