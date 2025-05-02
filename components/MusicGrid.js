import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MusicGrid = ({ albums }) => {
  return (
    <>
      <section className="music_display">
        {albums.map((album) => (
          <article key={album.title}>
            {/* <Link href={album.link}> */}
            <Link href={`/${album.slug}`}>
              <a data-test="musicGridLink">
                <Image src={album.coverURL} width="245" height="245" />
                <br />
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
