import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ACNMImg from '../public/assets/albums/acnmcover.jpg';
import IslandImg from '../public/assets/albums/Island.jpg';
import TekserveImg from '../public/assets/albums/tekservecoverlarge.jpg';
import LunarImg from '../public/assets/albums/lunar-cover-scaled.jpg';
import SpectrumImg from '../public/assets/albums/SpectrumCover.jpg';
import WalnutCreekImg from '../public/assets/albums/walnut-creek.jpeg';
import ChildhoodImg from '../public/assets/albums/childhood.jpeg';
import NoodleBirdImg from '../public/assets/albums/noodle-bird.jpeg';
import SnowBearImg from '../public/assets/albums/snow-bear.jpeg';
import QuietPlaces from '../public/assets/albums/quiet-places.jpeg';
import TurningLeavesIMG from '../public/assets/albums/turningleavescover.jpg';
import CoversIMG from '../public/assets/albums/covers.jpg';
import LastChristmasIMG from '../public/assets/albums/LastChristmasCover.jpg';

const albumPhotos = {
  'Last Christmas': LastChristmasIMG,
  Covers: CoversIMG,
  'Turning Leaves': TurningLeavesIMG,
  'AC: New Murder Soundtrack': ACNMImg,
  Island: IslandImg,
  'Tek Serve': TekserveImg,
  Lunar: LunarImg,
  Spectrum: SpectrumImg,
  'Walnut Creek': WalnutCreekImg,
  Childhood: ChildhoodImg,
  'Noodle Bird': NoodleBirdImg,
  'Snow Bear': SnowBearImg,
  'Quiet Places': QuietPlaces,
};

const MusicGrid = ({ albums }) => {
  return (
    <>
      <section className="music_display">
        {albums.map((album) => (
          <article key={album.title}>
            <Link href={album.link}>
              <a target="_blank" rel="noopener noreferrer">
                <Image src={albumPhotos[album.title]} />
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
