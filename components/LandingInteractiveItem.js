import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const isOutboundUrl = (href) => /^https?:\/\//.test(href);
const shouldOpenInNewTab = (href) =>
  isOutboundUrl(href) || href === '/amethyst-zone';

export default function LandingInteractiveItem({ title, href, image }) {
  const content = (
    <>
      <span className="interactive_tile_image_frame" aria-hidden="true">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="interactive_tile_image"
        />
      </span>
      <span className="interactive_tile_title">{title}</span>
    </>
  );

  if (shouldOpenInNewTab(href)) {
    return (
      <article className="interactive_tile">
        <Link href={href}>
          <a
            className="interactive_tile_link"
            aria-label={title}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        </Link>
      </article>
    );
  }

  return (
    <article className="interactive_tile">
      <Link href={href}>
        <a className="interactive_tile_link" aria-label={title}>
          {content}
        </a>
      </Link>
    </article>
  );
}
