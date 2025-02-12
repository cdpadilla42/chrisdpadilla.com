---
title: Full Page Video Across Devices with React
tags:
  - Tech
  - React
  - JavaScript
date: '2025-02-12T11:35:07.322Z'
---

Video on the web takes special consideration. It can be a heavy asset for starters. Due to that, if the video is a stylistic element on the page rather than the main focus, you'll want to have a fallback available while the video loads. And on top of it all, playback behavior may be different between browsers for mobile and desktop environments.

When pulled off, though, they are an attention-grabbing style element. Background videos playing on hero sections of landing pages can set a strong tone right from the start of a user's visit to the site.

Today, I'll share what I've learned while working with my own full-page video project. We'll tackle all the challenges and get a simple 8-second loopable video working across devices.

## Accounting for Devices

Before setting up the elements, I want to do some groundwork. I'll need to account for two environments: mobile and desktop. In my case, I want a vertical video playing in a mobile setting and a horizontal video playing on desktop.

To detect this after the component has mounted in React, I can reach for a library to handle getting the window width. Let's go with [useHooks/useWindowSize ](https://usehooks.com/usewindowsize)


```

const FullPageVideo = ({
  verticalVideoSrc,
  horizontalVideoSrc,
  verticalBgImageSrc = '',
  horizontalBgImageSrc = '',
}) => {
  const isPlaying = useRef(false);
  const videoRef = useRef();
  const videoRefTwo = useRef();
  const pageLoaded = useRef(0);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const { width } = useWindowSize();
  const [mediumSize, setMediumSize] = useState(false);
  
  // . . .
}
```

This isn't necessary, but for my case, I don't need the page to be fully dynamic. I only need the check for window width to happen on page load. So I'm also using a `pageLoad` count to keep track of rerenders.

I'll then add a `useEffect` to handle updating the state of the app based on the width.

```
  useEffect(() => {
    if (pageLoaded.current < 2) {
      if (width > 800) {
        setMediumSize(true);
      } else {
        setMediumSize(false);
      }
      pageLoaded.current += 1;
    }
  }, [width]);
```

With that in place, let's get the JSX written for the actual page elements:

```
 return (
    <div className="album-story">
      <div className="album-story-page">
        <div
          className="album-story-video-wrapper"
          style={{ display: mediumSize ? 'block' : 'none' }}
        >
          <div
            className="album-story-bg-image"
            style={{ backgroundImage: `url('${horizontalBgImageSrc}')` }}
          />
          <video
            preload="none"
            loop
            muted
            type="video/mp4"
            playsInline
            ref={videoRef}
            className="album-story-video"
            key={horizontalVideoSrc}
          >
            <source src={horizontalVideoSrc} type="video/mp4" />
          </video>
        </div>

        <div
          className="album-story-video-wrapper"
          style={{ display: mediumSize ? 'none' : 'block' }}
        >
          <div
            className="album-story-bg-image"
            style={{
              backgroundImage: `url('${verticalBgImageSrc}')`,
            }}
          />
          <video
            preload="none"
            loop
            muted
            type="video/mp4"
            playsInline
            ref={videoRefTwo}
            className="album-story-video"
            key={verticalVideoSrc}
          >
            <source src={verticalVideoSrc} type="video/mp4" />
          </video>
        </div>
        <div className="album-story-play-button-container">
          <CSSTransition
            in={showPlayButton}
            timeout={2000}
            classNames="fade"
            unmountOnExit
          >
            <button
              className="album-story-play"
              onClick={onClick}
              disabled={isPlaying.current}
            >
              play
            </button>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
```

Note that I have two video elements on the page: horizontal and vertical.

This seems like it could be a tradeoff. I'm opting to render both elements to the page, but am only hiding them by CSS. Wouldn't this lead to poor performance on page load if I try to download both videos to the browser?

The way around this is pretty simple: Adding `preload="nnone"` to the video tag will keep the video from automatically loading on the page.

There are tradeoffs there. It means a delay in the playtime of your video. The option starts loading the video once the play button has been pressed.

A more sophisticated solution might be to use a service such as Cloudinary that will dynamically generate your video from the server. Generated videos can be cached and served up quickly. Not a sponsorship for their service, but just a consideration. 

In my case, I'll take the tradeoff. The video is only 8 seconds long and loops, so I'm not too concerned about load time.

## Fallback Images

Likely, this is not as necessary since I'm not autoloading videos. However, on iOS Safari, I did find that the video image would not show on load. So I needed a fallback image.

This is accomplished with simple overlays in CSS:

```

.album-story-bg-image {
  z-index: -1;
  background-size: cover;
  background-position: center;
}

.album-story-page {
  flex-grow: 1;
  flex-basis: 100%;
}

.album-story-video,
.album-story-play-button-container,
.album-story-bg-image {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  object-fit: cover;
  width: 100%;
  height: 100%;

}

.album-story-bg-image {
  z-index: -1;
  background-size: cover;
  background-position: center;
}

```

## Playing the Video

There are guardrails in most browsers to prevent autoplaying media when loading a page. Any video or audio is dependent on user interaction to occur first.

There are ways of working around this in certain cases. For video in particular, you may be able to get a video autoplaying if the video is muted. [Mozilla has a great deep dive](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay) on the subject of handling autoplay scenarios dynamically.

For my case, I'll wait to trigger the video on user click. 

```
  const onClick = () => {
    if (!isPlaying.current) {
      isPlaying.current = true;
      song.current.play();
      if (videoRef.current && mediumSize) videoRef.current.play();
      if (videoRefTwo.current && !mediumSize) videoRefTwo.current.play();
      setShowPlayButton(false);
      setTimeout(() => setShowTapStory(true), 2000);
    } else {
      if (videoRef) videoRef.current.pause();
      if (videoRefTwo) videoRefTwo.current.pause();
      videoRefTwo.current.pause();
      isPlaying.current = false;
    }
  };
```

## iOS Considerations

Chrome is my daily driver on desktop. When I went to test this, the behavior was not what I expected.

We already covered the fallback image above.

Additionally, playing the video would literally set it to a full-screen player instead of staying embedded in the web page.

Thankfully, it's as easy as an attribute on the video tag to get this working:  `playsInline` did the trick for me.

```
<video
    preload="none"
    loop
    muted
    type="video/mp4"
    playsInline
    ref={videoRefTwo}
    className="album-story-video"
    key={verticalVideoSrc}
>

```


## Voilà!

With that, we now have a full-screen video working!

(This is part of an upcoming project on this site. I can't show the results just yet, so I'll share them when it goes live!)
