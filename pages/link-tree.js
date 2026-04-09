import React from 'react';
import Head from 'next/head';
import LinkTreePage from '../components/linkTree/LinkTreePage';
import { linkTree } from '../lib/linkTree';

export default function LinkTreeRoute() {
  return (
    <>
      <Head>
        <title>Link Tree | Chris Padilla</title>
        <meta
          name="description"
          content="Socials, favorite projects, and links from Chris Padilla."
        />
      </Head>
      <LinkTreePage linkTree={linkTree} />
    </>
  );
}
