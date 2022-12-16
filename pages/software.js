import React from 'react';
import Container from '../components/container';
import Layout from '../components/layout';
import Head from 'next/head';
import Header from '../components/header';
import Link from 'next/link';
import { getSoftwareProjects } from '../lib/api';
import ProjectGrid from '../components/ProjectGrid';

export default function Projects({ softwareProjects }) {
  return (
    <Layout>
      <Head>
        <title>Software | Chris Padilla</title>
      </Head>
      <Container>
        <Header />
        <h1>Software Projects.</h1>
        <p>
          You can find out more about my coding story on{' '}
          <Link href="/about">my about page</Link>. The gist: I'm a{' '}
          <strong>Full Stack JavaScript developer</strong> who loves making
          delightful web applications that solve problems for people.
        </p>
        <p>
          My technolgoies of choice are <strong>React</strong>,{' '}
          <strong>Express</strong>, <strong>Node</strong>, <strong>AWS</strong>,{' '}
          and <strong>MongoDB</strong>, to name a few.
        </p>
        <p>
          Most of the code I write is a part of{' '}
          <a
            href="https://www.aptamigo.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            AptAmigo
          </a>
          , where I work.
        </p>
        <p>
          I write technical articles on <Link href="/blog">my blog</Link>. Most
          of my posts are tutorials and dev journals from my personal projects.
        </p>
        <p>
          Want to get in touch? Find out how you can{' '}
          <Link href="/contact">contact me</Link>.
        </p>
        <ProjectGrid softwareProjects={softwareProjects} />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  const softwareProjects = getSoftwareProjects();

  const serializedSoftwareProjects = JSON.parse(
    JSON.stringify(softwareProjects)
  );

  return {
    props: {
      softwareProjects: serializedSoftwareProjects,
    },
  };
}
