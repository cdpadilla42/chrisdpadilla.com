import React from 'react';
import LandingInteractiveItem from './LandingInteractiveItem';

export const interactiveProjects = [
  {
    title: 'Bird Box',
    description:
      'A pleasant toy music box! A mobile app designed for playing with sound and learning melodies by ear. Playable on iOS, Android, and web.',
    image:
      'https://padilla-media.s3.amazonaws.com/albums/covers/bird-box-ost.jpg',
    href: '/birdbox',
  },
  {
    title: 'Amethyst',
    description:
      'An interactive short story to accompany the liquid drum and bass album. Playable in browser.',
    image: 'https://padilla-media.s3.amazonaws.com/albums/covers/amethyst.jpg',
    href: '/amethyst-zone',
  },
  {
    title: 'AC: New Murder',
    description:
      "A tribute game to Animal Crossing. Story and design by my sister Jenn, web app and music by your's truly!",
    image:
      'https://padilla-media.s3.amazonaws.com/albums/covers/ac-new-murder-soundtrack.jpg',
    href: '/acnm',
  },
];

export default function LandingInteractive() {
  return (
    <section className="interactive" aria-label="Interactive projects">
      {interactiveProjects.map((project) => (
        <LandingInteractiveItem
          key={project.href}
          title={project.title}
          href={project.href}
          image={project.image}
        />
      ))}
    </section>
  );
}
