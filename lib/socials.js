import { BANDCAMP_URL, BLUESKY_URL, GITHUB_URL, LINKEDIN_URL } from './constants';

export const socials = [
  {
    id: 'bluesky',
    label: 'Bluesky',
    url: BLUESKY_URL,
    active: true,
    icon: {
      emoji: '🦋',
    },
    description: 'Short posts and site updates.',
  },
  {
    id: 'bandcamp',
    label: 'Bandcamp',
    url: BANDCAMP_URL,
    active: true,
    icon: {
      emoji: '💿',
    },
    description: 'Albums, soundtracks, and sketches.',
  },
  {
    id: 'github',
    label: 'GitHub',
    url: GITHUB_URL,
    active: true,
    icon: {
      emoji: '👾',
    },
    description: 'Code, experiments, and open source projects.',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: LINKEDIN_URL,
    active: false,
    icon: {
      emoji: '💼',
    },
    description: 'Professional profile.',
  },
];

export function getActiveSocials() {
  return socials.filter((social) => social.active);
}
