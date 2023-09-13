import Link from 'next/link';
import React from 'react';

const ArtGrid = ({ images }) => {
  return (
    <>
      <section className="art_display">
        {images.map((image, i) => (
          <article key={image.src} className={`${i > 0 ? 'hideonmobile' : ''}`}>
            <Link href={`/${image.slug}`}>
              <a data-test="musicGridLink">
                <div
                  className={`artgridimage`}
                  style={{
                    height: '250px',
                    width: '250px',
                    background: 'transparent no-repeat center',
                    backgroundSize: 'cover',
                    margin: 'auto',
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
