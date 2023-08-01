import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Header from '../components/header';
import Layout from '../components/layout';
import ACNMStartDisplay from '../public/assets/projects/ACNM/acnmfrontpage.png';

const About = () => {
  return (
    <Layout>
      <Head>
        <title>AC: New Murder | Chris Padilla</title>
      </Head>
      <Header />
      <h1>AC: New Murder </h1>
      <div className="center">
        <Image
          src={ACNMStartDisplay}
          alt={`AC: New Mureder Start Page`}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      <h2>I Made A Game!</h2>
      <p>
        <Link
          href="https://acnewmurder.com/play"
          target="_blank"
          rel="noopener noreferrer"
        >
          AC: New Murder
        </Link>{' '}
        is a murder-mystery who-dun-it in the style of Phoenix Wright, featuring
        characters from Animal Crossing. The story and art are done by my sister
        Jenn. I developed the game for web browsers and built out all things
        software related.
      </p>

      <p>
        Oh, and I{' '}
        <Link
          href="https://letsgochris.bandcamp.com/album/ac-new-murder-soundtrack"
          target="_blank"
          rel="noopener noreferrer"
        >
          made the music
        </Link>
        , too!
      </p>

      <h2>The History</h2>

      <p>
        2 years ago, my sister{' '}
        <Link
          href="https://www.jennpadilla.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jenn
        </Link>{' '}
        approached me with an idea for a murder mystery game featuring some of
        the characters from Animal Crossing. I was looking for a fun new way to
        sharpen my software engineering skills, and I was won over by the
        silliness of the story!
      </p>

      <p>
        What started out as a pretty simple web app for displaying text turned
        into a fully fledged visual novel.
      </p>

      <p>And now you can play it!!</p>

      <h2>Playing the Game</h2>

      <p>
        The game works in tandem with visiting Jenn's island in Animal Crossing:
        New Horizons. Completing the game (and enjoying all the cool
        customizations Jenn made in New Horizons) requires a Nintendo Switch and
        the official Animal Crossing game.
      </p>
      <p>
        If you don't have either, you can still work through the first act of
        the game to get a feel for the web app!
      </p>
      <p>
        You can{' '}
        <Link
          href="https://acnewmurder.com/play"
          target="_blank"
          rel="noopener noreferrer"
        >
          get started here
        </Link>
        !
        {/* If you don't have the game, or just want to go through the web app by itself, you can click here to unlock the items ahead of time. */}
      </p>

      <h2>Tech Stack</h2>

      <p>
        For those curious, the game was developed with the same tools I use for
        software engineering on the web: React, Redux, Node, MongoDB, and more.
        You can read about it in my <Link href="/acnmp">blog posts</Link>.
      </p>

      <h2>Links</h2>
      <p>
        <Link
          href="https://acnewmurder.com/play"
          target="_blank"
          rel="noopener noreferrer"
        >
          🕵️‍♂️ Play AC: New Murder
        </Link>
      </p>

      <p>
        <Link
          href="https://acnewmurder.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          🔍 Visit the Official Site
        </Link>
      </p>

      <p>
        <Link
          href="https://letsgochris.bandcamp.com/album/ac-new-murder-soundtrack"
          target="_blank"
          rel="noopener noreferrer"
        >
          🎶 Listen to the Soundtrack
        </Link>
      </p>

      <p>
        <Link
          href="https://github.com/cdpadilla42/AMM"
          target="_blank"
          rel="noopener noreferrer"
        >
          💾 View the Code
        </Link>
      </p>

      <p>🧑‍💻 Read more about the project on my blog:</p>
      <ul>
        <li>
          <Link href="/acnmp">Technical Overview</Link>
        </li>
        <li>
          <Link href="/acnmfe">Developing a Game in React</Link>
        </li>
        <li>
          <Link href="/acnmbe">Using Sanity as a Level Maker</Link>
        </li>
        <li>
          <Link href="/acnmpm">Project Management for Game Development</Link>
        </li>
      </ul>
      <p>📚 Dive deeper with my articles on particular features:</p>
      <ul>
        <li>
          <Link href="/backgroundmusic">
            Adding Background Music to Websites
          </Link>
        </li>
        <li>
          <Link href="/refactorredux">Redux Growing Pains and React Query</Link>
        </li>
        <li>
          <Link href="/newsletterreact">
            Creating a Newsletter Form in React
          </Link>
        </li>
        <li>
          <Link href="/diyanalytics">
            Developing DIY Analytics while Navigating CORS
          </Link>
        </li>
      </ul>
    </Layout>
  );
};

export default About;
