---
title: Album Player On Site!
tags:
  - Music
  - Tech
  - This Website
date: '2025-12-23T10:25:18.322Z'
---

<figure>
  ![Gramophone, Charles Bowman (American, c. 1937)](http://res.cloudinary.com/cpadilla/image/upload/v1766510240/chrisdpadilla/blog/images/czgsn84jtan1an3sgz1z.png)
  <figcaption>[Gramophone](https://artvee.com/dl/gramophone#00), Charles Bowman (American, c. 1937)</figcaption>
</figure>

It didn't feel very [POSSE](https://indieweb.org/POSSE) of me to have so much on this site as a source of truth, _except_ for my own albums!

All the major players have their baggage in the music hosting/streaming space, unfortunately. Even previously humble Bandcamp has traded parent companies _twice_ in the past few years.

And besides — I have to say there's a little something special in having music play on this lil' site — in the same way that a hand rolled pizza at home is different from a frozen one, eh?

So I whipped a solution up this morning! See an example on [the ol' Bird Box OST page](/birdboxost).

## Tech

For the technically curious —

The base html audio element, like so many others, comes out of the box with plenty of helpful attributes. There's some extra work to get a playlist style interface, but this is handled through those attributes. Namely: `onEnded`, which allows the player to continue to the next track, `onTimeUpdate` to visually show track place, and `onLoadedMetadata` for keeping tabs on the track length (helpful for visual slider for track time position)

```jsx
const PlaylistPlayer = ({ tracks }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    if (currentIndex < tracks.length - 1) {
      play(currentIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  // . . .

  // part of the return:
  <audio
    ref={audioRef}
    onEnded={handleEnded}
    onTimeUpdate={handleTimeUpdate}
    onLoadedMetadata={handleLoadedMetadata}
  />;
};

export default PlaylistPlayer;
```

Funnily enough, the range input element works well for showing and adjusting the track position:

```jsx
const handleSeek = (e) => {
  const time = parseFloat(e.target.value);
  audioRef.current.currentTime = time;
  setCurrentTime(time);
};

// . . .

<input
  type="range"
  min={0}
  max={duration || 0}
  value={currentTime}
  onChange={handleSeek}
  aria-label="Seek"
/>;
```

The rest is styling and a few more handlers in the React component.

Files are stored on AWS through S3. I had to whip up a script to upload and adjust my albums.js file en masse, a somewhat tedious task since many older albums were not quite as organized as my newer ones. Left plenty of time to get nostalgic!

Give it a whirl! Visit any of the albums on [my music page](/music).
