import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import NextLink from './NextLink';

const LearningResourceItem = ({ item }) => {
  // Handle both link items and bookshelf items
  const title = item.title || item.name;
  const description = item.description || item.desc;
  const url = item.url || item.purchase;

  return (
    <article key={title} style={{ display: 'block' }}>
      <p>
        {item.image && (
          <figure className="bookshelf_image_wrapper">
            <img src={item.image} alt={title} className="bookshelf_image" />
          </figure>
        )}
        {url ? (
          <NextLink href={url} style={{ fontWeight: 'bold' }}>
            {title}
          </NextLink>
        ) : (
          <strong style={{ fontWeight: 'bold' }}>{title}</strong>
        )}
        :{' '}
        <Markdown
          options={{
            overrides: {
              a: NextLink,
            },
          }}
        >
          {description}
        </Markdown>
      </p>
      <div className="clearfix" />
    </article>
  );
};

LearningResourceItem.propTypes = {
  item: PropTypes.oneOfType([
    // Link item shape
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
    // Bookshelf item shape
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      author: PropTypes.string,
      desc: PropTypes.string.isRequired,
      purchase: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      image: PropTypes.string,
    }),
  ]).isRequired,
};

export default LearningResourceItem;
