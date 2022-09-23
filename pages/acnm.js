import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Header from '../components/header';
import Layout from '../components/layout';
import ACNMStartDisplay from  '../public/assets/projects/acnmfrontpage.png'

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
        />
        </div>

      
      <h2>I Made A Game!</h2>
      <p><Link href="https://acnewmurder.com/play"><a target="_blank" rel="noopener noreferrer">AC: New Murder</a></Link> is a murder-mystery who-dun-it in the style of Phoenix Wright, featuring characters from Animal Crossing. The story and art are done by my sister Jenn. I developed the game for web browsers and built out all things software related.</p>

      <p>Oh, and I <Link href="https://letsgochris.bandcamp.com/album/ac-new-murder-soundtrack"><a target="_blank" rel="noopener noreferrer">made the music</a></Link>, too!</p>

      <p>2 years ago, my sister Jenn approached me with an idea for a murder mystery game featuring some of the characters from Animal Crossing. I was looking for a fun new way to sharpen my software engineering skills, and I was won over by the silliness of the story!</p>

      <h2>The History</h2>

      <p>What started out as a pretty simple web app for displaying text turned into a fully fledged visual novel.</p>

      <p>And now you can play it!!</p>

      <h2>Playing the Game</h2>

      <p>The game works in tandem with visiting Jenn's island in Animal Crossing: New Horizons. You can <Link href="https://acnewmurder.com/play"><a target="_blank" rel="noopener noreferrer">get started here</a></Link>!
      
      {/* If you don't have the game, or just want to go through the web app by itself, you can click here to unlock the items ahead of time. */}
      
      </p>

      <h2>Tech Stack</h2>

      <p>
      The game is a web app, so all you need to do is visit the site to get started.
      </p><p>
      For those curious, it was developed with the same tools I use for software engineering on the web: React, Redux, Node, MongoDB, and more. You can read about it in my <Link href="/acnmp"><a>blog posts</a></Link>.</p>

      <h2>Links</h2>
      <p><Link href="https://acnewmurder.com/play"><a target="_blank" rel="noopener noreferrer">🕵️‍♂️ Play AC: New Murder</a></Link></p>

      <p><Link href="https://acnewmurder.com/"><a target="_blank" rel="noopener noreferrer">🔍 Visit the Official Site</a></Link></p>

      <p><Link href="https://letsgochris.bandcamp.com/album/ac-new-murder-soundtrack"><a target="_blank" rel="noopener noreferrer">🎶 Listen to the Soundtrack</a></Link></p>

      <p>🧑‍💻 Read more about the project on my blog:</p>
      <ul>
        <li><Link href="/acnmp"><a>Technical Overview</a></Link></li>
        <li><Link href="/acnmfe"><a>Developing a Game in React</a></Link></li>
        <li><Link href="/acnmbe"><a>Using Sanity as a Level Maker</a></Link></li>
        <li><Link href="/acnmpm"><a>Project Management for Game Development</a></Link></li>
      </ul>

    </Layout>
  );
};

export default About;
