import Link from 'next/link';
import Image from 'next/image';
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
                <div className={`artgridimage ${page}`}>
                  <Image
                    src={image.src}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    sizes="(max-width: 799px) calc(100vw - 2.5rem), 30vw"
                  />
                </div>
              </a>
            </Link>
          </article>
        ))}
      </section>
    </>
  );
};

export default ArtGrid;
