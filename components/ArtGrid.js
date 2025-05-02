import Link from 'next/link';
import React from 'react';

const ArtGrid = ({ images, page }) => {
  return (
    <>
      <section className="art_display">
        {images.map((image, i) => (
          <article
            key={image.src}
            className={`art_display_article ${
              i > 0 && page === 'home' ? 'hideonmobile' : ''
            }`}
          >
            <Link href={`/${image.slug}`}>
              <a data-test="musicGridLink" className="artgridlink">
                <div
                  className={`artgridimage ${page}`}
                  style={{
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
