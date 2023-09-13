import Link from 'next/link';
import React from 'react';

const ArtGrid = ({ images }) => {
  return (
    <>
      <section className="music_display">
        {images.map((image) => (
          <article key={image.src}>
            <Link href={`/${image.slug}`}>
              <a data-test="musicGridLink">
                <div
                  style={{
                    height: '250px',
                    width: '250px',
                    background: 'transparent no-repeat center',
                    'background-size': 'cover',
                    backgroundImage: `url('${image.src}')`,
                  }}
                />
              </a>
            </Link>
          </article>
        ))}
      </section>
    </>
  );
};

export default ArtGrid;
