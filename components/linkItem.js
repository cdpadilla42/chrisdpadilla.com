import React from 'react';
import Markdown from 'markdown-to-jsx';
import { capitalizeFirstLetter } from '../lib/util';
import NextLink from './NextLink';
import markdownToHtml from '../lib/markdownToHtml';

const LinkItem = ({ link }) => {
  return (
    <li key={link.name}>
      <NextLink href={link.url}>{link.title}</NextLink>:{' '}
      <Markdown
        options={{
          forceInline: true,
          overrides: {
            a: NextLink,
          },
        }}
      >
        {link.description}
      </Markdown>
    </li>
  );
};

export default LinkItem;
