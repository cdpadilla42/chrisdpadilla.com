export const softwareProjects = [
  {
    title: 'ACNM',
    liveLink: 'https://acnewmurder.com/',
    githubLink: 'https://github.com/cdpadilla42/AMM',
    image: 'https://padilla-media.s3.amazonaws.com/blog/acnm/SNotes.png',
    releaseDate: new Date('2022-12-22T05:35:07.322Z'),
    emoji: '🔍',
    description:
      'ACNM was a long term side project that developed into a production-level application. The game follows a murder-mystery plot where players must collect evidence, gather testimonies from different characters, and successfully present contradictory evidence to uncover the right suspect.',
    stack: [
      'React',
      'Next.js',
      'Node',
      'Redux',
      'Styled Components',
      'SCSS',
      'Sanity',
    ],
  },
  {
    title: 'Chris Padilla dot com',
    liveLink: 'https://www.chrisdpadilla.com',
    githubLink: 'https://github.com/cdpadilla42/chrisdpadilla.com',
    image:
      'https://padilla-media.s3.amazonaws.com/software-project-assets/Screen+Shot+2022-12-16+at+3.25.17+PM.png',
    releaseDate: new Date('2022-06-25T05:35:07.322Z'),
    emoji: '🎷',
    description:
      'This website! The major feature of this site is hosting my blog and projects. The site is a Next.js SSR application that stores data in local JSON and Markdown files. AWS S3 is utilized for media storage. It all adds up to a light, performant site.',
    stack: ['Next.js', 'Node', 'React', 'AWS'],
  },
  {
    title: '¡Taco Time!',
    liveLink: 'https://taco-time-nextjs.vercel.app/',
    githubLink: 'https://github.com/cdpadilla42/taco-time-nextjs',
    image:
      'https://padilla-media.s3.amazonaws.com/software-project-assets/tacotimepreview600.png',
    releaseDate: new Date('2020-12-07T05:35:07.322Z'),
    emoji: '🌮',
    description:
      'Taco Time is a fictional restaurant taking inspiration from Taco Deli here in Austin, TX. With the need to showcase and allow customers to order an array of breakfast and lunch tacos, this application dynamically renders item pages and maintains a detailed cart that stores their orders and customizations. This intricate project employs multiple modern web development tools and techniques, including Server Side Rendering, interacting with a GraphQL API, running server-less functions, and dynamically rendering individual item pages with Next JS’s dynamic routes.',
    stack: [
      'Next.js',
      'React',
      'Redux',
      'GraphQL',
      'MongoDB',
      'Mongoose',
      'Apollo Client & Micro Server',
      'Styled Components',
      'React Transition Group',
    ],
  },
  {
    title: 'Mystery Cowboy Theater',
    liveLink:
      'http://mysterycowboytheater-env.eba-tdkgfkfh.us-east-1.elasticbeanstalk.com/theater/The-Domain',
    githubLink:
      'https://github.com/cdpadilla42/mystery-cowboy-theater-fullstack',
    image:
      'https://padilla-media.s3.amazonaws.com/software-project-assets/mct-preview.png',
    releaseDate: new Date('2020-10-26T05:35:07.322Z'),
    emoji: '🎟',
    description:
      'Mystery Cowboy Theater is a fictional single screen theater that loves showing exclusively Mystery Science Theater 3000 films and episodes! This full-stack application fulfills CRUD operations, demonstrates responsive design, and utilizes secure authorization measures on both the client and server side.',
    stack: [
      'React',
      'MongoDB',
      'Mongoose',
      'Node',
      'Express',
      'SCSS',
      'Passport',
      'AWS',
      'Elastic Beanstalk',
    ],
  },
  {
    title: 'Secret Poets Society',
    liveLink:
      'http://secretpoetssociety-env.eba-m4efzmqx.us-east-1.elasticbeanstalk.com/',
    githubLink: 'https://github.com/cdpadilla42/secret-poets-society',
    image:
      'https://padilla-media.s3.amazonaws.com/software-project-assets/sps-preview.png',
    releaseDate: new Date('2020-09-29T05:35:07.322Z'),
    emoji: '💀',
    description:
      'The Secret Poets Society is a club of artists sharing work purely for arts sake. Not for fame or glory! As part of the practice, the authors names are unlisted to visitors. The site has tiered membership permissions, the ability to sign up for an account, and fulfills CRUD operations.',
    stack: [
      'Express',
      'Node',
      'Handlebars.js',
      'MongoDB',
      'Mongoose',
      'CSS',
      'Passport',
      'AWS',
      'Elastic Beanstalk',
    ],
  },
];
