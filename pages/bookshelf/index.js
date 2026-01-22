import React from 'react';
import { promises as fs } from 'fs';
import { bookshelf } from '../../lib/bookshelf';
import Container from '../../components/container';
import Layout from '../../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/header';
import { useRouter } from 'next/router';
import BookshelfItem from '../../components/bookshelfItem';
import path from 'path';
import { BlogImage } from '../../components/post-body';
import NextLink from '../../components/NextLink';

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
        <article className="markdown">
          <figure>
            <BlogImage
              alt="Courtyard of the Jagiellonian Library (1846), Marcin Zaleski (Polish, 1796-1877)"
              src="https://padilla-media.s3.amazonaws.com/blog/images/a2yke7kajboqe5wp1znl.jpg"
            />
            <figcaption>
              <NextLink href="https://artvee.com/dl/courtyard-of-the-jagiellonian-library/">
                Courtyard of the Jagiellonian Library (1846)
              </NextLink>
              , Marcin Zaleski (Polish, 1796-1877)
            </figcaption>
          </figure>
        </article>
        <p>
          My words on other people's words. None of the links included are
          affiliate links. Sharing these is payment enough!
        </p>
        <section>
          {Object.values(books).map((book) => (
            <BookshelfItem book={book} />
          ))}
        </section>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const books = bookshelf;
  const file = await fs.readFile(
    path.resolve(process.cwd() + '/_cache/bookshelfLinks.json'),
    'utf8'
  );
  const bookshelfLinks = JSON.parse(file);

  for (const key of Object.keys(bookshelfLinks)) {
    if (books[key]) {
      books[key].postLinks = bookshelfLinks[key];
    }
  }

  return {
    props: {
      books,
    },
  };
}
