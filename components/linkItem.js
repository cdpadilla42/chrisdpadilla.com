import React from 'react';
import Markdown from 'markdown-to-jsx';
import { capitalizeFirstLetter } from '../lib/util';
import NextLink from './NextLink';
import markdownToHtml from '../lib/markdownToHtml';

const LinkItem = ({ link }) => {
  return (
    <li key={link.name}>
      <span>
        <NextLink href={link.url}>{link.title}</NextLink>:{' '}
        <Markdown
          options={{
            overrides: {
              a: NextLink,
            },
          }}
        >
          {link.description}
        </Markdown>
      </span>
    </li>
  );
};

export default LinkItem;
