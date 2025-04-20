import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function LandingInteractiveItem({
  name,
  description,
  link,
  image,
}) {
  return (
    <div className="interactive_container">
      <Link href={link}>
        <a>
          <Image
            src={image}
            alt="Amethyst"
            width="150"
            height="150"
            className="interactive_image"
          />
        </a>
      </Link>
      <div className="interactive_description">
        <h3>
          <Link href={link}>
            <a>{name}</a>
          </Link>
        </h3>
        <span>{description}</span>
      </div>
    </div>
  );
}
