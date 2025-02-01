import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useWindowSize } from '../lib/useWindowSize';
import { Howl } from 'howler';

const AlbumStory = ({
  verticalVideoSrc,
  horizontalVideoSrc,
  audioSrc,
  verticalBgImageSrc = '',
  horizontalBgImageSrc = '',
}) => {
  const isPlaying = useRef(false);
  const audioRef = useRef();
  const videoRef = useRef();
  const videoRefTwo = useRef();
  const pageLoaded = useRef(0);
  const [show, setShow] = useState(true);
  const [mediumSize, setMediumSize] = useState(false);
  const { width } = useWindowSize();
  const song = useRef();

  useEffect(() => {
    if (!song.current) {
      song.current = new Howl({
        src: [audioSrc],
        loop: true,
        html5: true,
      });
    }
  }, []);

  const isVideoPlaying = (video) =>
    !!(
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > 2
    );

  const onClick = () => {
    if (!isPlaying.current) {
      // audioRef.current.play();
      song.current.play();
      if (videoRef.current) videoRef.current.play();
      if (videoRefTwo.current) videoRefTwo.current.play();
      isPlaying.current = true;
      setShow(false);
    } else {
      if (videoRef) audioRef.current.pause();
      if (videoRefTwo) videoRef.current.pause();
      videoRefTwo.current.pause();
      isPlaying.current = false;
    }
  };

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

  const bgImageUr = mediumSize ? horizontalBgImageSrc : verticalBgImageSrc;

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
            preload="auto"
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
            preload="auto"
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
        <CSSTransition in={show} timeout={300} classNames="fade" unmountOnExit>
          <button className="album-story-play" onClick={onClick}>
            play
          </button>
        </CSSTransition>
      </div>
      {/* <audio preload="auto" loop src={audioSrc} ref={audioRef} /> */}
    </div>
  );
};

export default AlbumStory;
