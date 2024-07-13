import React from 'react';
import { bookshelf } from '../../lib/bookshelf';
import Container from '../../components/container';
import Layout from '../../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/header';
import { useRouter } from 'next/router';
import BookshelfItem from '/components/bookshelfItem'

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
        <Header />
        <h2>Bookshelf</h2>
        <p>My words on other people's words.</p>
        <section>
        {books.map((book) => (
         <BookshelfItem book={book} />
        ))}
      </section>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const books = bookshelf;
  return {
    props: {
      books,
    },
  };
}

