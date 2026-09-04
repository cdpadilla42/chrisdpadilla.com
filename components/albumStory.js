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
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showTapStory, setShowTapStory] = useState(false);
  const { width } = useWindowSize();
  const song = useRef();
  const hasViewport = typeof width === 'number';
  const mediumSize = width > 800;

  useEffect(() => {
    if (!song.current) {
      song.current = new Howl({
        src: [audioSrc],
        loop: true,
        html5: true,
      });
    }

    return () => song.current.stop();
  }, []);

  const onClick = () => {
    if (!isPlaying.current) {
      isPlaying.current = true;
      song.current.play();
      if (videoRef.current) videoRef.current.play();
      setShowPlayButton(false);
      setTimeout(() => setShowTapStory(true), 2000);
    } else {
      if (videoRef.current) videoRef.current.pause();
      isPlaying.current = false;
    }
  };

  return (
    <>
      <div className="album-story">
        <div className="album-story-page">
          {hasViewport && (
            <div className="album-story-video-wrapper">
              <div
                className="album-story-bg-image"
                style={{
                  backgroundImage: `url('${
                    mediumSize ? horizontalBgImageSrc : verticalBgImageSrc
                  }')`,
                }}
              />
              <video
                preload="auto"
                loop
                muted
                type="video/mp4"
                playsInline
                ref={videoRef}
                className="album-story-video"
                key={mediumSize ? horizontalVideoSrc : verticalVideoSrc}
              >
                <source
                  src={mediumSize ? horizontalVideoSrc : verticalVideoSrc}
                  type="video/mp4"
                />
              </video>
            </div>
          )}
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
