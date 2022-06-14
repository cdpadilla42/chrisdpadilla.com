import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MusicGrid = ({ albums }) => {
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
