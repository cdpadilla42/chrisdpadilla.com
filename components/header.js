import Link from 'next/link';

export default function Header({ section }) {
  return (
    <header className="header">
      <h1>
        <Link href="/">
          <a>Chris Padilla</a>
        </Link>
        {section ? (
          <>
            <span className="header_divider">/</span>
            {section}
          </>
        ) : (
          '.'
        )}
      </h1>
    </header>
  );
}
