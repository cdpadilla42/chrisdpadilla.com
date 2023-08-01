import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Header from '../components/header';
import Layout from '../components/layout';

const FourOhFour = () => {
  return (
    <Layout>
      <Head>
        <title>Chris Padilla — Developer & Musician</title>
      </Head>
      <Header />
      <h1>404'd! Page Not Found</h1>
      <p>
        Let's mosey on back to the{' '}
        <Link href={`/`}>
          <a>Home Page</a>
        </Link>
        , cowboy! 🤠
      </p>
    </Layout>
  );
};

export default FourOhFour;
