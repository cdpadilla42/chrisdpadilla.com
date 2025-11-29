import React from 'react';
import { promises as fs } from 'fs';
import path from 'path';
import { links } from '../../lib/links';
import Container from '../../components/container';
import Layout from '../../components/layout';
import Head from 'next/head';
import Header from '../../components/header';
import { bookshelf } from '../../lib/bookshelf';
import LinkItem from '../../components/linkItem';
import BookshelfItem from '../../components/bookshelfItem';
import NextLink from '../../components/NextLink';

export default function LearningResources({ books }) {
  const tags = [
    'musicresource',
    'guitar',
    'artresource',
    'programming',
    'creativity',
  ];
  const groupBooksByTag = (items = [], tags = []) => {
    const tagsDict = {};
    tags.forEach((tag) => {
      tagsDict[tag] = [];
    });
    items.forEach((item) => {
      item.tags.forEach((tag) => {
        if (tagsDict[tag]) {
          tagsDict[tag].push(item);
        }
      });
    });
    return tagsDict;
  };

  const booksByTag = groupBooksByTag(Object.values(books), tags);
  const linksGroupedByTag = groupBooksByTag(links, tags);

  const renderBooksSection = (books) => {
    if (!books) return null;
    return books.map((book) => (
      <BookshelfItem key={book.slug} book={book} hideReadDetails linkInTitle />
    ));
  };

  const renderLinksSection = (links) => {
    if (!links) return null;
    return links.map((link) => <LinkItem key={link.url} link={link} hideTag />);
  };

  const sections = [
    {
      title: 'Creativity',
      id: 'creativity',
      tag: 'creativity',
      description:
        'Most of the sections after this one are a matter of learning the tools for the medium. These are applicable to all areas, highly worth reading no matter what you create.',
    },
    {
      title: 'Music',
      id: 'music',
      tag: 'musicresource',
      description:
        'The best way to learn music is by doing it, whether you play an instrument, compose, or produce digitally. Most of the resources here are methods for doing exactly that.',
    },
    {
      title: 'Programming',
      id: 'programming',
      tag: 'programming',
      description:
        'Whether you are looking to go pro or are curious about exploring a rich hobby in webcraft, there is an infinite ocean of resources at your disposal. Below are favorites, spanning online curriculums, podcasts, and interesting writers in the tech space.',
    },
    {
      title: 'Art',
      id: 'art',
      tag: 'artresource',
      description:
        'Resources for getting started, be it pencil and paper, or a digital tablet. Primary focus here are fundamentals, since style very swiftly takes folks off into their own direction.',
    },
  ];

  const renderSection = ({ title, id, tag, description }) => {
    const links = linksGroupedByTag[tag];
    const books = booksByTag[tag];
    return (
      <section key={id}>
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
        {links?.length > 0 && (
          <>
            <h3>Links</h3>
            <ul>{renderLinksSection(links)}</ul>
          </>
        )}
        {books?.length > 0 && (
          <>
            <h3>Books</h3>
            {renderBooksSection(books)}
          </>
        )}
      </section>
    );
  };

  return (
    <Layout>
      <Head>
        <title>Chris Padilla — Learning Resources</title>
        <meta
          property="og:title"
          content="Chris Padilla — Learning Resources"
        />
      </Head>
      <Container>
        <Header />
        <h1>Learning Resources</h1>
        <p>
          Materials for learning how to code, create art, and make music. Some
          paid, many free. Links are pulled from my{' '}
          <NextLink href="/links">links</NextLink> page, books from the{' '}
          <NextLink href="/bookshelf">bookshelf</NextLink>.
        </p>
        <nav>
          <span>Jump to a section:</span>
          <ul>
            {sections.map(({ title, id }) => (
              <li key={id}>
                <a href={`#${id}`}>{title}</a>
              </li>
            ))}
          </ul>
        </nav>
        {sections.map(renderSection)}
        <hr />
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
