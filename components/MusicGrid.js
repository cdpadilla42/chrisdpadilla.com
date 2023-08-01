import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MusicGrid = ({ albums }) => {
  return (
    <>
      <section className="music_display">
        {albums.map((album) => (
          <article key={album.title}>
            {/* <Link href={album.link}> */}
            <Link href={`/${album.slug}`} data-test="musicGridLink">
              <Image
                src={album.coverURL}
                width="245"
                height="245"
                style={{ width: '100%', height: 'auto' }}
              />
              <span>{album.title}</span>
            </Link>
          </article>
        ))}
      </section>
    </>
  );
};

export default MusicGrid;
