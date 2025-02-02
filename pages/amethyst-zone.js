import React from 'react';
import AlbumStory from '../components/albumStory';
import Head from 'next/head';
import Meta from '../components/meta';
import TapEssay from '../components/tapEssay/tapEssay';

const verticalVideoSrc =
  'https://res.cloudinary.com/cpadilla/video/upload/v1738379301/chrisdpadilla/blog/video/LiquidDnBVideoVerticalVideoOnlyCompressed_gobbfw.mp4';
const horizontalVideoSrc =
  'https://res.cloudinary.com/cpadilla/video/upload/v1738379302/chrisdpadilla/blog/video/LiquidDnBVideoOnly16-9_de8vsn.mp4';

const audioSrc =
  'https://res.cloudinary.com/cpadilla/video/upload/v1738464782/chrisdpadilla/blog/audio/LiquidDnBMastered_bhvjyo.mp3';

const horizontalBgImageSrc =
  'https://res.cloudinary.com/cpadilla/image/upload/v1738425039/chrisdpadilla/blog/imgs/LiquidDnBHorizontalImage_pty9cl.jpg';
const verticalBgImageSrc =
  'https://res.cloudinary.com/cpadilla/image/upload/v1738425039/chrisdpadilla/blog/imgs/LiquidDnBVerticalImage_zs8xvl.jpg';

const AmethystZone = () => {
  return (
    <>
      <Meta favicon="AmethystFavicon-16x16.png" />
      <Head>
        <title>A m e t h y s t ⋆.˚ ₊ ⊹</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Charm:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <AlbumStory
        verticalVideoSrc={verticalVideoSrc}
        horizontalVideoSrc={horizontalVideoSrc}
        audioSrc={audioSrc}
        horizontalBgImageSrc={horizontalBgImageSrc}
        verticalBgImageSrc={verticalBgImageSrc}
      />
    </>
  );
};

export default AmethystZone;
