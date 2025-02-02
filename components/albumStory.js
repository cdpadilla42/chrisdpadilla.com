import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useWindowSize } from '../lib/useWindowSize';
import { Howl } from 'howler';
import TapEssay from './tapEssay/tapEssay';

const AlbumStory = ({
  verticalVideoSrc,
  horizontalVideoSrc,
  audioSrc,
  verticalBgImageSrc = '',
  horizontalBgImageSrc = '',
}) => {
  const isPlaying = useRef(false);
  const videoRef = useRef();
  const videoRefTwo = useRef();
  const pageLoaded = useRef(0);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showTapStory, setShowTapStory] = useState(false);
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

  const onClick = () => {
    if (!isPlaying.current) {
      isPlaying.current = true;
      song.current.play();
      if (videoRef.current) videoRef.current.play();
      if (videoRefTwo.current) videoRefTwo.current.play();
      setShowPlayButton(false);
      setTimeout(() => setShowTapStory(true), 2000);
    } else {
      if (videoRef) videoRef.current.pause();
      if (videoRefTwo) videoRefTwo.current.pause();
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

  return (
    <>
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
      <CSSTransition
        in={!showPlayButton && showTapStory}
        PlayButton
        timeout={4000}
        classNames="fade-slow"
        unmountOnExit
      >
        <TapEssay onComplete={() => setShowTapStory(false)} />
      </CSSTransition>
    </>
  );
};

export default AlbumStory;
