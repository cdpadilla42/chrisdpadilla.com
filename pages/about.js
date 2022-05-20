import React from 'react';
import Layout from '../components/layout';

const About = () => {
  function calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const bd = new Date('1992-06-02');
  const npbd = new Date('2000-06-02');

  return (
    <Layout>
      <h2>Hey, I'm Chris! </h2>
      <p>Nice to meet you!</p>
      <h2>The Gist</h2>
      <p>
        <strong>
          I'm a software engineer and musician from Dallas, Texas. 🤠
        </strong>{' '}
        I have been hacking and musicing for pretty much most of my life! I'm{' '}
        {calculateAge(bd)} years old and wrangled my first lines of HTML, CSS,
        and JavaScript on{' '}
        <a href="https://en.wikipedia.org/wiki/Neopets">Neopets.com</a>{' '}
        {calculateAge(npbd)} years ago.
      </p>
      <strong>
        I'm currently doing full stack web development with{' '}
        <a href="https://www.aptamigo.com/">AptAmigo.</a>{' '}
      </strong>
      I spend my days writing React and Node code, squashing bugs, and designing
      delightful components.
      <p>
        <strong>I'm an avid learner and maker!</strong> I bounce between
        reading, writing, learning new instruments, composing, and trying new
        things. That's what's so great about tech. I love being a part of a
        community that is constantly improving.
      </p>
      <h2>The Origin Story</h2>
      <p>
        <strong>I've loved tech since I was a kid.</strong> My mom has this
        story she is embarrased to tell — I was so hooked on computers that my
        dad helped me bring our Compaq desktop with us on a beach vaction to
        Galveston when I was 5. There's always been so much to explore and make
        in the tech space. I grew up making custom web profiles, hacking a
        Nintendo 3DS to download a{' '}
        <a href="http://web.archive.org/web/20190118070140/http://nitrotracker.tobw.net/index.php?cat_id=0">
          midi synth
        </a>
        , and hosting my creative projects on my first site moomoofilms.com (now
        defunct.)
      </p>
      <p>
        <strong>I love community and teaching</strong>. My career began with
        teaching music to middle and high schoolers. I found immense fulfillment
        in helping students break down road blocks and solve problems
        creatively.
      </p>
      <p>
        <strong>My journey into development was interesting.</strong> I
        eventually found myself working on websites for my projects and musical
        groups about as much as I was teaching. For a while, wanting to develop
        full time was one of those "Unthought Knowns." After a particular "A-ha"
        afternoon, I commited myself to teaching myself modern web development
        in 2019.
      </p>
      <p>
        <strong>I've been working full time as of 2021.</strong> It's been a
        blast!
      </p>
      <h2>Life</h2>
      <p>
        <strong>
          I live in the Dallas area with my girlfriend Miranda and our pup Lucy.
        </strong>{' '}
        We all love the food here. 👌
      </p>
      <p>
        <strong>I have a few hobbies.</strong> Namely, I still make music in
        various different forms. I fling myself against bouldering walls pretty
        regularly. I read. Lots of non-fiction, with sprinkles of Terry
        Pratchett novels and illustrative essays.
      </p>
    </Layout>
  );
};

export default About;
