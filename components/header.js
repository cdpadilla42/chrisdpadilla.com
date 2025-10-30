import Link from 'next/link';
import { lowercaseFirstLetter } from '../lib/util';
import RssSvg from './rssSvg';
import { useSearch } from '../lib/SearchContext';

export default function Header({ section, tag }) {
  const { openSearch } = useSearch();
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

  const bookshelfHeader = () => (
    <>
      <Link href="/bookshelf">
        <a>Bookshelf</a>
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
  } else if (section === 'bookshelf') {
    trailingHeader = (
      <>
        <span className="header_divider">/</span>
        {bookshelfHeader()}
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
      <button
        className="search-button"
        onClick={openSearch}
        aria-label="Search posts"
        title="Search (Cmd/Ctrl+K)"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="search-button-shortcut">⌘K</span>
      </button>
      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .search-button {
          background: transparent;
          border: 1px solid var(--blue);
          border-radius: 6px;
          color: var(--blue);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .search-button:hover {
          background: rgba(78, 205, 196, 0.1);
          border-color: var(--yellow);
          color: var(--yellow);
        }

        .search-button-shortcut {
          font-family: monospace;
          font-size: 0.85rem;
          opacity: 0.8;
        }

        @media (max-width: 600px) {
          .search-button-shortcut {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
