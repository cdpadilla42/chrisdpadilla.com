import React from 'react';
import Markdown from 'markdown-to-jsx';
import NextLink from './NextLink';

const LinkFeedItem = ({ link }) => {
  console.log(link);
  const dateString = new Date(link.dateAdded).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  console.log(dateString);
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
        <span style={{ color: 'grey', fontStyle: 'italic', whiteSpace: 'pre' }}>
          tags: {link.tags.map((tag) => tag).join(', ')}
          <br />- {dateString}
        </span>
      </div>
    </li>
  );
};

export default LinkFeedItem;
