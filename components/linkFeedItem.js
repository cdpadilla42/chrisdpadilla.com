import React from 'react';
import Markdown from 'markdown-to-jsx';
import NextLink from './NextLink';

const LinkFeedItem = ({ link }) => {
  const dateString = new Date(link.dateAdded).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <li style={{ paddingBottom: '1rem' }}>
      <NextLink href={link.url}>{link.title}</NextLink>:{' '}
      <Markdown
        options={{
          overrides: {
            a: NextLink,
          },
        }}
      >
        {/* {link.description} – {dateString} */}
        {link.description}
      </Markdown>
      <br />
      <div style={{ textAlign: 'right' }}>
        <span
          style={{
            color: 'grey',
            fontStyle: 'italic',
            whiteSpace: 'pre',
            textWrap: 'wrap',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          tags: {link.tags.map((tag) => tag).join(', ')}
        </span>
        <br />
        <span
          style={{
            color: 'grey',
            fontStyle: 'italic',
            whiteSpace: 'pre',
            textWrap: 'wrap',
          }}
        >
          - {dateString}
        </span>
      </div>
    </li>
  );
};

export default LinkFeedItem;
