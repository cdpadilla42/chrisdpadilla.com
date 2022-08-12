import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Header from '../components/header';
import Layout from '../components/layout';
import { calculateAge } from '../lib/util';

const About = () => {
  const bd = new Date('1992-06-02');
  const npbd = new Date('2000-06-02');

  return (
    <Layout>
      <Head>
        <title>About | Chris Padilla</title>
      </Head>
      <Header />
      <h1>Hey, I'm Chris! </h1>
      <p>Nice to meet you!</p>
      <h2>The Gist</h2>
      <p>
        <strong>
          I'm a software engineer and musician from Dallas, Texas. 🤠
        </strong>
        {'  '}I have been hacking and musicing for pretty much most of my life!
        I'm {calculateAge(bd)} years old and wrangled my first lines of HTML,
        CSS, and JavaScript on{' '}
        <a
          href="https://thehistoryoftheweb.com/neopets/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Neopets.com
        </a>{' '}
        {calculateAge(npbd)} years ago.
      </p>
      <strong>
        I'm currently doing full stack web development with{' '}
        <a
          href="https://www.aptamigo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          AptAmigo.
        </a>{' '}
      </strong>
      I spend my days writing React and Node code, squashing bugs, and designing
      delightful components.
      <p>
        <strong>I'm an avid learner and maker!</strong> I bounce between
        reading, writing, learning new instruments, composing, and trying new
        things. There's always something new to try!
      </p>
      <h2>Coding Origin Story</h2>
      <p>
        <strong>I've loved tech since I was a kid.</strong> My mom has this
        story she is embarrased to tell — When I was 5, I was so hooked on
        computers that my dad helped me bring our Compaq desktop with us on a
        beach vaction to Galveston.{' '}
      </p>
      <p>
        There's always been so much to explore and make in the tech space. I
        grew up making custom web profiles, hacking a Nintendo DS to download a{' '}
        <a
          href="http://web.archive.org/web/20190118070140/http://nitrotracker.tobw.net/index.php?cat_id=0"
          target="_blank"
          rel="noopener noreferrer"
        >
          midi synth
        </a>
        , and hosting my creative projects on my first site moomoofilms.com (now
        defunct.)
      </p>
      <p>
        <strong>I love community and teaching.</strong> My career began with
        teaching music to middle and high schoolers. I found immense fulfillment
        in helping students break down road blocks and solve problems
        creatively.
      </p>
      <p>
        <strong>My journey into software was interesting.</strong> I eventually
        found myself working on websites for my teaching projects and musical
        groups just about as much as I was teaching. For a while, wanting to
        develop full time was one of those "Unthought Knowns." After a
        particular "A-ha" afternoon, I commited myself to teaching myself modern
        web development in 2019.
      </p>
      <p>
        <strong>I've been developing full time as of 2021.</strong> It's been a
        blast!
      </p>
      <p>
        You can{' '}
        <a
          href="https://chrispadilla.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          visit my portfolio here.
        </a>
      </p>
      <h2>Music</h2>
      <p>
        <strong>I've been musicing since I was a kid.</strong> I started on
        saxophone in middle school. I took all the music classes I could and
        dabbled in writing. My biggest influences have been video game
        soundtracks, early jazz, and classical music.
      </p>
      <p>
        <strong>I ended up going to college for music!</strong> Some of the best
        years of my life! I went to UNT for a bachelor's in music ed 🦅 and UT
        for a master's in performance. 🤘
      </p>
      <p>
        <strong>I write music to tell stories and create atmospheres.</strong>{' '}
        Mostly light hearted and playful, I use writing as a means to capture
        what I love — other music, people, or moments in time.
      </p>
      <p>
        You can{' '}
        <Link href="/music">
          <a>listen to my music here.</a>
        </Link>
      </p>
      <h2>Life</h2>
      <p>
        <strong>
          I live in the Dallas area with my girlfriend and our pup Lucy.
        </strong>{' '}
        We all love the food here. 👌
      </p>
      <p>
        <strong>I have a few hobbies.</strong> I fling myself against bouldering
        walls pretty regularly. I read. Tons! Lots of non-fiction, with
        sprinkles of Terry Pratchett novels and illustrative essays.
      </p>
    </Layout>
  );
};

export default About;
