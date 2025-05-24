import React from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import Head from 'next/head';
import Header from '../components/header';
import {
  MUSIC_TWITTER_URL,
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  MASTODON_URL,
  BLUESKY_URL,
} from '../lib/constants';
import Link from 'next/link';

export default function Blog() {
  return (
    <Layout noFooter>
      <Head>
        <title>Bird Box Privacy Policy & Support</title>
      </Head>
      <Header />
      <Container>
        <h2>Bird Box Support</h2>
        <p>For support, reach out to cdpadillapub@gmail.com</p>
        <h2>Bird Box Privacy Policy</h2>
        <p>
          This Privacy Policy explains how Bird-Box (the "App") collects, uses,
          and protects your information. Information We Collect: We do not
          collect any personally identifiable information from you. We may
          collect usage data to improve the App, but this data is not linked to
          your identity.
        </p>
        <p>
          How We Use Your Information: We use usage data to analyze app
          performance and identify areas for improvement. We do not share your
          information with third parties. Your Rights: You have the right to
          uninstall the App at any time. You can contact us with any questions
          or concerns about this policy.
        </p>
        <p>
          {' '}
          Contact Us: If you have any questions about this Privacy Policy,
          please contact us at cdpadillapub@gmail.com.{' '}
        </p>
        <p>
          Changes to this Policy: We may update this Privacy Policy from time to
          time. We will notify you of any changes by posting the updated policy
          within the App.
        </p>
      </Container>
    </Layout>
  );
}
