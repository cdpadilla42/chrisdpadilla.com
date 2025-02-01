import React from 'react';
import AlbumStory from '../components/albumStory';

const verticalVideoSrc =
  'https://res.cloudinary.com/cpadilla/video/upload/v1738379301/chrisdpadilla/blog/video/LiquidDnBVideoVerticalVideoOnlyCompressed_gobbfw.mp4';
const horizontalVideoSrc =
  'https://res.cloudinary.com/cpadilla/video/upload/v1738379302/chrisdpadilla/blog/video/LiquidDnBVideoOnly16-9_de8vsn.mp4';

const audioSrc =
  'https://res.cloudinary.com/cpadilla/video/upload/v1738379392/chrisdpadilla/blog/audio/LiquidDnBASide_uvmed8.mp3';

const AmethystZone = () => {
  return (
    <AlbumStory
      verticalVideoSrc={verticalVideoSrc}
      horizontalVideoSrc={horizontalVideoSrc}
      audioSrc={audioSrc}
    />
  );
};

export default AmethystZone;
