import { interactiveProjects } from '../components/LandingInteractive';
import { albums } from './albums';
import featuredAlbumSlugs from './featuredAlbums';
import { getActiveSocials } from './socials';
import { slugify } from './util';

const projectDescriptions = {
  'Bird Box': 'Pleasant toy music box for iOS & Android!',
  Amethyst:
    'Surreal interactive short story with an atmospheric drum and bass soundtrack.',
  'AC: New Murder':
    'New Horizons meets Phoenix Wright in a sibling made fan game!',
};
const projectUrls = {
  'AC: New Murder': 'https://acnewmurder.com/',
};
const projectEmojis = {
  'Bird Box': '🦜',
  Amethyst: '🔮',
  'AC: New Murder': '🕵️',
};

const projectLinks = interactiveProjects.map((project) => ({
  title: project.title,
  description: projectDescriptions[project.title] || project.description,
  url: projectUrls[project.title] || project.href,
  icon: {
    emoji: projectEmojis[project.title],
  },
}));

const socialLinks = getActiveSocials().map((social) => ({
  title: social.label,
  description: undefined,
  url: social.url,
  icon: social.icon,
}));

const publicAlbums = albums.filter((album) =>
  process.env.NODE_ENV === 'development'
    ? true
    : album.releaseDate <= new Date(),
);

const homepageAlbums = publicAlbums
  .filter((album) => !album.noShowOnHomepage)
  .sort((albumA, albumB) => albumB.releaseDate - albumA.releaseDate);
const latestAlbumLinks = homepageAlbums.slice(0, 1).map((album) => ({
  title: album.title,
  description: album.shortDesc,
  url: `/${slugify(album.title)}`,
  icon: {
    emoji: album.emoji,
  },
}));

const curatedAlbumLinks = featuredAlbumSlugs
  .slice(0, 2)
  .map((slug) => publicAlbums.find((album) => slugify(album.title) === slug))
  .filter(Boolean)
  .map((album) => ({
    title: album.title,
    description: album.shortDesc,
    url: `/${slugify(album.title)}`,
    icon: {
      emoji: album.emoji,
    },
  }));

const shownAlbumCount = latestAlbumLinks.length + curatedAlbumLinks.length;

const albumLinks = [
  ...latestAlbumLinks,
  ...curatedAlbumLinks,
  {
    title: 'See All Albums',
    description: `${publicAlbums.length - shownAlbumCount} more!`,
    url: '/music',
    icon: {
      emoji: '🎧',
    },
  },
];

const extraSocialLinks = [
  {
    title: 'Blog',
    description: undefined,
    url: '/blog',
    icon: {
      emoji: '🪴',
    },
  },
  {
    title: 'RSS',
    description: undefined,
    url: '/api/feed',
    icon: {
      emoji: '📡',
    },
  },
];

const resourceLinks = [
  {
    title: 'Learning Resources',
    description:
      'Dozens of books and online materials for learning music, art, programming, and creativity.',
    url: '/learningresources',
    icon: {
      emoji: '📚',
    },
  },
];

export const linkTree = {
  profile: {
    name: 'Chris Padilla',
    // bioEmoji: '🌌',
    bio: 'Making little worlds out of music, drawings, and code.',
    bioArt: '. ݁˖ .⋆ ݁｡˚⋆ ˖⁺‧₊˚✦⋆˚｡⋆. ݁˖ .',
    homeUrl: '/',
    avatarAlt: 'Chris Padilla headshot',
    avatarSrc:
      'https://padilla-media.s3.amazonaws.com/blog/images/headshot-blue.jpg',
  },
  groups: [
    {
      id: 'primary',
      title: 'Start here',
      links: [
        {
          title: 'Website',
          description: 'Portfolio, digital garden, & open notebook',
          url: '/',
          highlight: true,
          icon: {
            emoji: '🌎',
          },
        },
      ],
    },
    {
      id: 'projects',
      title: 'Interactive',
      links: projectLinks,
    },
    {
      id: 'albums',
      title: 'Latest Albums',
      links: albumLinks,
    },
    {
      id: 'resources',
      title: 'Resources',
      links: resourceLinks,
    },
    {
      id: 'socials',
      title: 'Socials',
      links: [extraSocialLinks[0], ...socialLinks, extraSocialLinks[1]],
    },
  ],
};
