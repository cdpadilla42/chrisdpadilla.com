import React from 'react';
import AlbumStory from '../components/albumStory';
import Head from 'next/head';
import Meta from '../components/meta';
import TapEssay from '../components/tapEssay/tapEssay';

const verticalVideoSrc =
  'https://padilla-media.s3.amazonaws.com/blog/video/LiquidDnBVideoVerticalVideoOnlyCompressed.mp4';
const horizontalVideoSrc =
  'https://padilla-media.s3.amazonaws.com/blog/video/LiquidDnBVideoOnly16-9.mp4';

const audioSrc =
  'https://padilla-media.s3.amazonaws.com/blog/images/LiquidDnBMastered.mp3';

const horizontalBgImageSrc =
  'https://padilla-media.s3.amazonaws.com/blog/images/LiquidDnBHorizontalImage.jpg';
const verticalBgImageSrc =
  'https://padilla-media.s3.amazonaws.com/blog/images/LiquidDnBVerticalImage.jpg';

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
