import Head from 'next/head';
import React from 'react';
import Header from '../components/header';
import Layout from '../components/layout';
import { calculateAge } from '../lib/util';

const Sax = () => {
  return (
    <Layout>
      <Head>
        <title>Saxophone Music | Chris Padilla</title>
        <meta property="og:image" content="/assets/headshot.jpeg" />
      </Head>
      <Header />
      <h2>Music — The Saxophone Era</h2>
      <p>
        <strong>
          Here are some of my favorite recordings from when I was regularly
          playing sax!
        </strong>{' '}
      </p>
      <p>
        I performed as a classical saxophonist. I dabbled in jazz, but both
        traditional and experimental playing were my main vehicles. If you
        didn't know that <i>classical sax</i> was a thing, you are in the
        majority! It's fairly niche.
      </p>
      <p>
        I played in jazz ensembles, concert and marching bands, saxophone
        quartets, and mixed insrumentation new music (aka, avant-garde) groups.
      </p>
      <p>
        On this page are mostly saxophone quartet and "solo" performances with
        piano. Some classical pieces and some non-traditional pieces. Much of it
        from my time at UT and UNT.
      </p>
      <p>
        It's been a big part of my life and I worked with several amazing
        musicians all along the way! The other musicians on these recordings are
        dear friends.
      </p>
      <p>
        Big thanks to the incredible teachers I worked with: Graham Tobin,{' '}
        <a
          href="https://music.unt.edu/faculty-and-staff/eric-nestler"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dr. Eric Nestler
        </a>{' '}
        at UNT, and{'  '}
        <a
          href="http://stephen-page.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Stephen Page
        </a>{' '}
        at UT.
      </p>
      <p>All recordings are live and unedited.</p>

      <h3>
        Colors That Dance from Hypercolor by{' '}
        <a
          href="https://www.davidwerfelmann.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          David Werfelmann
        </a>
      </h3>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/MODUS+plays+Werfelmann's+Hypercolor%2C+III++Colors+that+Dance.mp3"
        controls="controls"
      />
      <p>
        Performing with MODUS, my grad school saxophone quaret at UT. Very
        special group of people:{' '}
        <a
          href="https://calvin-wong.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Calvin Wong
        </a>{' '}
        on Soprano,{' '}
        <a
          href="https://www.sarahhetricksaxophone.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sarah Hetrick
        </a>{' '}
        on Alto, Nick McNamara on tenor, and your's truly on bari. Listening to
        this brings back so many good memories!! Very floaty textures through
        out this one.
      </p>

      <h3>Primavera</h3>
      <a
        href="https://www.youtube.com/watch?v=oWi2xosQo5w"
        target="_blank"
        rel="noopener noreferrer"
      >
        Video on YouTube
      </a>
      <p>
        This was unbelievably fun! Definitely the artsy-est thing I've been a
        part of. A full blown multi-media / live dance production as part of an
        anual festival at UT. Many amazingly talented people worked on the
        design here. Stephen Rothermel composed the music and produced the
        electronic track. I'm performing bari here with MODUS
      </p>

      <h3>Tango Etude No. 5 by Astor Piazzolla</h3>
      <h4>I. Allegro</h4>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/Piazzolla+Tango+Etude+No.+5.wav"
        controls="controls"
      />
      <p>
        My last recording on sax before diving fully into coding (...from{' '}
        {calculateAge(new Date('2019-05-12'))} years ago!) I was working on this
        during my first year of teaching. This short dance has so much fire and
        color to it. At the time, I was listening to several violinists,
        especially Joshua Bell. I worked really hard here to steal their levity,
        quickness, and nuance. Listening back, I'm surprised — it might be one
        of my most polished recordings! My girlfriend Miranda graciously helped
        with this recording.
      </p>

      <h3>Sonata by Edison Denisov</h3>
      <h4>I. Allegro</h4>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/Chris+Padilla+performs+Denisov+I.+Allegro.wav"
        controls="controls"
      />
      <h4>II. Lento & III. Allegro Moderato</h4>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/Chris+Padilla+performs+Denisov's+Sonata+-+II.+Lento+%26+III.+Allegro+Moderato.wav"
        controls="controls"
      />
      <p>
        This piece was a blast!! One of my proudest performances. Quintesential
        avant-garde saxophone playing. Denisov drew inspiration from 12-tone
        composition, bebop, and pointalism, bringing it all into one. Dizying
        and energetic music! The first movement is a dance (try waltzing to
        that!), the second a meditation that immediately blends into the third —
        a hard bop. Many of the squonks here are part of the piece, and some of
        the most beautiful writing for those effects! I had tremendous lessons
        with my teacher Stephen Page at UT on this. Joseph Dougherty plays piano
        here tremendously!!
      </p>

      <h3>Concerto by Pierre Max Dubois</h3>
      <h4>I. Lento Espressivo</h4>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/Dubois+I.wav"
        controls="controls"
      />
      <h4>II. Sarabande</h4>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/Dubois+II.wav"
        controls="controls"
      />
      <h4>III. Rondo</h4>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/Dubois+III.wav"
        controls="controls"
      />
      <p>
        My first study at UT. A big ol' bucket of notes. The first movement is
        mostly a solo cadenza. I still hear the second movement in my head — the
        lyricism really stuck with me. The third movement fits into my Spahgetti
        Western perception of several saxophone pieces. The amazing Dr. Alex
        Maynegre performs the piano reduction here.
      </p>

      <h3>Der Schönheitsmolch by Joseph Klein</h3>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/KleinFinal.mp3"
        controls="controls"
      />
      <p>
        While I was at UNT, the school had gotten a brand new{' '}
        <a
          href="https://en.wikipedia.org/wiki/Bass_saxophone"
          target="_blank"
          rel="noopener noreferrer"
        >
          bass saxophone
        </a>
        , special ordered from Selmer in Paris. I was VERY fortunate to be one
        of the first to play it for this one! The title translates to "The
        Beauty Newt" — based on a story about a creature "keen on all the
        beautiful things" but who is absolutely repuslive. Dr. Klein's full
        notes are available on{' '}
        <a
          href="https://josephklein.music.unt.edu/compositions/schonheitsmolch"
          target="_blank"
          rel="noopener noreferrer"
        >
          his site
        </a>
        .
      </p>

      <h3>Concerto for Wind Ensemble by Paul Creston</h3>
      <h4>I. Energetic</h4>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/Creston_+Concerto+I.+Energetic.wav"
        controls="controls"
      />
      <h4>II. Meditative</h4>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/Creston_+Concerto+II.+Meditative.wav"
        controls="controls"
      />
      <h4>III. Rhythmic</h4>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/Creston_+Concerto+III.+Rhythmic.wav"
        controls="controls"
      />
      <p>
        This was a really special opportunity! I was an understudy for a
        concerto performance with saxophone solo and band. I never ended up
        playing this in concert, but I got to play and record a dress rehearsal
        with full band!
      </p>
      <p>
        I was playing on pure adrenaline!! (I can espeically hear it with how
        fast I take some of these lines!!) Getting to the rehearsal in the first
        place was a mad rush that day. This is the most energy I've ever played
        with. Makes me think of how crazy indestructable we are in those college
        days!
      </p>
      <p>
        The legendary Dennis Fisher conducts the Symphonic Band with many great
        friends in the group!
      </p>

      <h3>Jenn Song</h3>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/jenn+song+2.wav"
        controls="controls"
      />
      <p>
        No sax in this one! This is a chiptune song I wrote on a DS in{' '}
        <a
          href="http://web.archive.org/web/20190118070140/http://nitrotracker.tobw.net/index.php?cat_id=0"
          target="_blank"
          rel="noopener noreferrer"
        >
          nitrotracker
        </a>
        . I wanted to write something inspire by my sister{' '}
        <a
          href="https://www.jennpadilla.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jenn's
        </a>{' '}
        art. This was done some summer inbetween terms at UNT. I can hear
        influences from quartet music! A little Gorillaz Plastic Beach too, with
        the siren. Maybe some{' '}
        <a
          href="https://disasterpeace.com/blog/"
          target="_blank"
          rel="noopener noreferrer"
        >
          disasterpeace
        </a>{' '}
        in there too. My theory knowledge was very minimal, so I'm impressed
        with how cohesive and interesting this still is after so many years!
      </p>

      <h3>Saxophone Quartet by Alfred Desneclos</h3>
      <h4>I. Allegro non troppo</h4>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/Desenclos_+Quatuor+I.+Allegro+non+tr.wav"
        controls="controls"
      />
      <h4>II. Andante</h4>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/Desenclos_+Quatuor+II.+Andante.wav"
        controls="controls"
      />
      <h4>III. Poco largo, ma risoluto</h4>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/Desenclos_+Quatuor+III.+Poco+largo%2C.wav"
        controls="controls"
      />
      <p>
        From playing with The Millenium Quartet at UNT, another special group of
        folks! Sarah Dunbar on Soprano, Jess Dodge on Alto, myself on Tenor, and
        Kevin Ford on bari. Amazing memories playing with these musicians! The
        piece itstelf is hauntingly lyrical.
      </p>

      <h3>Paganini Lost by Jun Nagao</h3>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/PaganiniLostFinal.wav"
        controls="controls"
      />
      <p>
        This one's just fun!! A mix of quotes from the{' '}
        <a
          href="https://www.youtube.com/watch?v=UcL0IsklM3M"
          target="_blank"
          rel="noopener noreferrer"
        >
          Paganini Violin Caprice No. 24
        </a>{' '}
        with prog rock writing and, of course, a classicaly trained trio! Xiao
        Wang plays piano, Jess Dodge and I sax. Jess took all the high notes!
      </p>

      <h3>Concertino da Camara by Jacques Ibert</h3>
      <audio
        src="https://padilla-media.s3.amazonaws.com/audio/sax/Ibert_+Concertin+Da+Camera+II.+Largh.wav"
        controls="controls"
      />
      <p>
        This is <strong>THE</strong> classical saxophone piece! My teacher at
        UNT, Dr. Eric Nestler introduced me to the playing of{' '}
        <a
          href="https://en.wikipedia.org/wiki/Eugene_Rousseau_(saxophonist)"
          target="_blank"
          rel="noopener noreferrer"
        >
          Eugene Rousseau
        </a>
        . He was essentially one of the grandfathers of this type of saxophone
        playing in the US. Warm sound, vigorous energy, and string-like
        boyouncy. I was obsessed! A lot of my playing here is the result of
        chasing that sound.
      </p>
      <p>
        The piece itself is fun! Another jazz influenced classical work, but
        this one is very much from a french neo-romantic perspective. This
        recording is of the second movement ballad and the third movement. I
        called it the Spahgetti Western movement at the time — that's what the
        energy sounded like to me, at least! The incomparable Xiao Wang performs
        the piano reduction beautifully.
      </p>
    </Layout>
  );
};

export default Sax;
