import React from 'react';
import { promises as fs } from 'fs';
import {
  links,
  sectionTags,
  sectionTagsArray,
  sectionTagsDetails,
} from '../../lib/links';
import Container from '../../components/container';
import Layout from '../../components/layout';
import Head from 'next/head';
import Header from '../../components/header';
import { useRouter } from 'next/router';
import LinkItem from '../../components/linkItem';
import { linksFeed } from '../../lib/linksFeed';
import LinkFeedItem from '../../components/linkFeedItem';
import Link from 'next/link';

const groupLinksByTag = (links) => {
  const groupedLinks = {};

  links.forEach((link) => {
    if (!link.tags) return;
    link.tags.forEach((tag) => {
      if (!groupedLinks[tag]) {
        groupedLinks[tag] = [];
      }
      groupedLinks[tag].push(link);
    });
  });

  return groupedLinks;
};

const groupedLinks = groupLinksByTag(links);

export default function Links() {
  const router = useRouter();

  const renderLinksSection = () => {
    return sectionTagsArray.map((tag) => {
      const tagDetails = sectionTagsDetails[tag];
      const tagLinks = groupedLinks[tag];
      console.log(groupedLinks);

      return (
        <section key={tag}>
          <h3>{tagDetails.title}</h3>
          {tagDetails.description && <p>{tagDetails.description}</p>}
          <ul>
            {tagLinks.map((link) => (
              <LinkItem key={link.name} link={link} />
            ))}
          </ul>
        </section>
      );
    });
  };

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
        <h1>Links</h1>
        <p>
          The web is made possible and most interesting thanks to the humble
          hyperlink! Here is a curated list of them.
        </p>
        <section>
          <h2>Favorites</h2>
          <p style={{ fontStyle: 'italic' }}>
            Links from around the web! A few favorites, not an exhaustive list.
          </p>
          {renderLinksSection()}
        </section>
        <hr />
        <section>
          <h2>Feed</h2>
          <p style={{ fontStyle: 'italic' }}>
            Occasional notes and discoveries from the web. You can follow by{' '}
            <Link href="/api/links/feed">
              <a>RSS</a>
            </Link>
            ! (<a href="https://aboutfeeds.com/">What's RSS?</a>)
          </p>
          <LinksFeed />
        </section>
      </Container>
    </Layout>
  );
}

export const LinksFeed = ({ limit }) => {
  let linksFeedList = [...linksFeed];
  if (limit) {
    linksFeedList = linksFeed.slice(0, limit);
  }
  return (
    <ul style={{ listStyleType: 'none', padding: 0, whiteSpace: 'normal' }}>
      {linksFeedList.map((link) => (
        <LinkFeedItem key={link.name} link={link} />
      ))}
    </ul>
  );
};
