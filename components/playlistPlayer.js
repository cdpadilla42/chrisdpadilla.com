import React, { useState, useRef } from 'react';

const PlaylistPlayer = ({ tracks }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const play = (index) => {
    if (currentIndex === index && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setCurrentIndex(index);
      audioRef.current.src = tracks[index].src;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    if (currentIndex === null) {
      play(0);
    } else if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex === null) return;
    if (currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else if (currentIndex > 0) {
      play(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === null) {
      play(0);
    } else if (currentIndex < tracks.length - 1) {
      play(currentIndex + 1);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

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

  return (
    <div className="playlist-player">
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className="playlist-controls">
        <button type="button" className="skip-btn" onClick={handlePrev} aria-label="Previous">
          ◀◀
        </button>
        <button
          type="button"
          className="play-btn"
          onClick={handlePlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button type="button" className="skip-btn" onClick={handleNext} aria-label="Next">
          ▶▶
        </button>
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          aria-label="Seek"
        />
        <span>{formatTime(duration)}</span>
      </div>
      {tracks.map((track, i) => (
        <div
          key={i}
          className={`playlist-track ${currentIndex === i ? 'playing' : ''}`}
          onClick={() => play(i)}
        >
          <div className="playlist-track-num">
            {currentIndex === i && isPlaying ? '▶' : i + 1}
          </div>
          <div className="playlist-title">{track.title}</div>
          <div className="playlist-duration">{track.duration}</div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistPlayer;
