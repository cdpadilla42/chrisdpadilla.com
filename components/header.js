import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <h1>
        <Link href="/">
          <a className="hover:underline">Chris Padilla</a>
        </Link>
        .
      </h1>
    </header>
  );
}
