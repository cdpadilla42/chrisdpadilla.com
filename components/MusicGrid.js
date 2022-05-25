import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SpectrumImg from '../public/assets/albums/SpectrumCover.jpg';
import WalnutCreekImg from '../public/assets/albums/walnut-creek.jpeg';
import ChildhoodImg from '../public/assets/albums/childhood.jpeg';
import NoodleBirdImg from '../public/assets/albums/noodle-bird.jpeg';
import SnowBearImg from '../public/assets/albums/snow-bear.jpeg';
import QuietPlaces from '../public/assets/albums/quiet-places.jpeg';

const MusicGrid = () => {
  const albums = [
    {
      title: 'Spectrum',
      photo: SpectrumImg,
      link: 'https://letsgochris.bandcamp.com/album/spectrum',
    },
    {
      title: 'Walnut Creek',
      photo: WalnutCreekImg,
      link: 'https://letsgochris.bandcamp.com/album/walnut-creek',
    },
    {
      title: 'Childhood',
      photo: ChildhoodImg,
      link: 'https://letsgochris.bandcamp.com/album/childhood',
    },
    {
      title: 'Noodle Bird',
      photo: NoodleBirdImg,
      link: 'https://letsgochris.bandcamp.com/album/noodle-bird',
    },
    {
      title: 'Snow Bear',
      photo: SnowBearImg,
      link: 'https://letsgochris.bandcamp.com/album/snow-bear',
    },
    {
      title: 'Quiet Places',
      photo: QuietPlaces,
      link: 'https://letsgochris.bandcamp.com/album/quiet-places',
    },
  ];
  return (
    <>
      <section className="music_display">
        {albums.map((album) => (
          <article key={album.title}>
            <Link href={album.link}>
              <a target="_blank" rel="noopener noreferrer">
                <Image
                  src={album.photo}
                  alt="Cover art for Spectrum. Photo of Lady Bird Lake."
                />
                <span>{album.title}</span>
              </a>
            </Link>
          </article>
        ))}
      </section>
    </>
  );
};

export default MusicGrid;
