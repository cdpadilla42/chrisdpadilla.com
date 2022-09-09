---
title: Adding Background Music to Websites
tags:
  - Tech
date: '2022-09-09T05:35:07.322Z'
---

I'm working on a project where I'm adding my own music for each page in a React app.

It has me nostalgic for the early internet. You would be cruising around, and all of a sudden, someone's Live Journal would have a charming MIDI of Enya's "Only Time" playing in the background.

<audio
    src="https://padilla-media.s3.amazonaws.com/blog/audio/enya-only-time.mp3"
    controls="controls"
  />

I'm definitely glad this isn't the norm anymore. I don't miss having to mute the obnoxious banner ads that included sound on Ask Jeaves. But now that the web is largely without sound as a background to pages, I've really enjoyed how it's bringing parts of this application to life!

# Quick Overview

The project isn't out yet, so for the heck of it, let's call my React app "Music Box."

The music is hosted on the Music Box's CDN (Sanity, in my case). The ideal format would be webm as it works across all modern browsers and is highly performant. For my use case, mp3's suited me just fine.

In my codebase, I have a big ol' object that stores the track URL's and which page ID's they should play on. It looks something like this:

```
const sounds = [
  {
      name: 'Bake Shop',
      src: 'https://cdn.sanity.io/files/qvonp967/production/f4163ffd79e09fdc32d028a1722ef8949fb31b85.mp3',
      conversationIDs: [
        '27f4be58-38f3-4321-bbc9-c76e0c675c36',
        'd008519f-16c0-4ef0-b790-f5eb0cb3b0b4',
      ],
      howl: null,
    },
    {
      name: 'Restaurant',
      src: 'https://cdn.sanity.io/files/qvonp967/production/4606e7ec6208df214d766776e3d5ed33408fe74d.mp3',
      conversationIDs: [
        'e1688c5f-218a-4656-ad96-df9a1c33b8f8',
        'a81fb6a7-d450-45e8-a942-e5c82fb1a812',
      ],
      howl: null,
    },
    ...
];

```

You'll notice each object also has a howl property. Let's get into how I'm playing sound:

# Playing Audio with Howler.js

[Howler.js](https://howlerjs.com/) is a delightfully feature-full API for handling sound with JavaScript. The library is built on top of the Web Audio API and also uses HTML5 audio for certain use cases. While I could have interfaced with the Web Audio API directly, Howler has much nicer controls for using multiple sounds, interrupting them, and keeping separate sound instances contained in a single sound palette.

For each page, we initiate the aproriate sound with this code:

```
  const initiateSound = (src) => {
    const sound = new Howl({
      src,
      loop: true,
    });

    return sound;
  };

```

`src` here is derived from the url. The loop option is turned on so that we get continuous music.

# Changing Audio Page to Page

This is all kept in a `SoundController` component at the top level of the react tree, above React Router.

```
function App() {

	...
	return (
    <>
      <SoundController />
      <Switch location={location} key={location.pathname}>
          <Route
            path="/testimony/:id"
            render={(props) => <Testimony match={props.match} />}
          ></Route>
          <Route path="/act-one">
            <ActOneTestimonySelect />
          </Route>
          ...
      </Switch>
    </>
    )
};

```

The main reason for this is so we have control over fading in and out between pages.

The other reason is for caching. Remember the `howl` properties in the `sound` array? That array is going to be stored in a `useRef()` call in the `SoundController` component. Then we can save each instantiated sound with the appropriate element in the array for future reference.

That's exactly what is happening here inside the `useEffect`. This code listens for a change in the `currentTrackObj` (triggered by a page change) and checks if we have a cached `howler` instance. The cache version is targeted if so, and a new one is played if not.

```
  useEffect(() => {
    if (currentTrackObj) {
      let howler;

      if(currentTrackObj.howl) {
        howler = currentTrackObj.howl;
      } else {
        howler = initiateSound(currentTrackObj.src);
      }

      currentTrackObj.howl = howler;
      howlerRef.current = currentTrackObj.howl;
      if (soundPlaying) {
        howlerRef.current.play();
      }
    }

    return () => {
      if (howlerRef.current && howlerRef.current.stop) {
        howlerRef.current.stop();
      }
    };
  }, [currentTrackObj]);

```

# Playing and Pausing

The state for this is stored in redux as `soundPlaying`. When that's toggled, we can interface with howler to play and pause the track.

```
  useEffect(() => {
    if (!playedAudio) {
      dispatch(setPlayedAudio(true));
    }

    if (howlerRef.current && howlerRef.current.playing) {
      if (soundPlaying && !howlerRef.current.playing()) {
        howlerRef.current.play();
      } else {
        howlerRef.current.pause();
      }
    }
  }, [soundPlaying]);

```

Then that's it! Musical bliss on every page!
