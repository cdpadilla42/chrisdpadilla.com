import React from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import Head from 'next/head';
import Header from '../components/header';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function SubUpdate() {

  return (
    <Layout noFooter>
      <Head>
        <title>Subscription Updated | Chris Padilla</title>
      </Head>
      <Header />
      <Container>
        <h1>Subscription Updated</h1>
				<p>Thanks, your subscription has been updated!</p>
      </Container>
    </Layout>
  );
}
