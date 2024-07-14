import React from 'react';
import { promises as fs } from 'fs';
import { bookshelf } from '../../lib/bookshelf';
import Container from '../../components/container';
import Layout from '../../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/header';
import { useRouter } from 'next/router';
import BookshelfItem from '/components/bookshelfItem'
import path from 'path';

export default function BookShelf({ books }) {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Chris Padilla — Developer, Musician, etc.</title>
        <meta
          property="og:title"
          content="Chris Padilla — Developer & Musician"
        />
      </Head>
      <Container>
        <Header section="bookshelf" />
        <p>My words on other people's words. Currently a pile in progress.</p>
        <section>
        {Object.values(books).map((book) => (
         <BookshelfItem book={book} />
        ))}
      </section>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const books = bookshelf;
  const file = await fs.readFile(path.resolve(process.cwd() + '/_cache/bookshelfLinks.json'), 'utf8');
  const bookshelfLinks = JSON.parse(file);

  for (const key of Object.keys(bookshelfLinks)) {
    if (books[key]) {
      books[key].postLinks = bookshelfLinks[key]
    }
  }

  return {
    props: {
      books,
    },
  };
}

