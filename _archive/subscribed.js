import React from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import Head from 'next/head';
import Header from '../components/header';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Subscribe() {
	const {query} = useRouter();

  return (
    <Layout noFooter>
      <Head>
        <title>Subscribed | Chris Padilla</title>
      </Head>
      <Header />
      <Container>
        <h1>Subscribe by Email.</h1>
				<p>Thank you for subscribing{query.n ? `, ${query.n}` : ''}! Keep an eye on your email for a message from me. Feel free to <Link href={`/contact`}>
            <a>reach out</a>
          </Link> if you don't hear from me.</p>
      </Container>
    </Layout>
  );
}
