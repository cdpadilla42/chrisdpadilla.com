import React from 'react';
import Markdown from 'markdown-to-jsx';
import { capitalizeFirstLetter } from '../lib/util';
import NextLink from './NextLink';

const BookshelfItem = ({ book, hideReadDetails, linkInTitle }) => {
  const renderPostLinks = () => {
    return book.postLinks.map((linkObj) => (
      <li key={linkObj.slug}>
        <NextLink href={linkObj.slug}>{linkObj.title}</NextLink>
      </li>
    ));
  };

  return (
    <article key={book.name}>
      <figure className="bookshelf_image_wrapper">
        <img src={book.image} className="bookshelf_image" />
      </figure>
      <h3 id={book.slug}>
        {linkInTitle && book.purchase ? (
          <NextLink href={book.purchase}>{book.name}</NextLink>
        ) : (
          book.name
        )}{' '}
        – by {book.author}
      </h3>
      {!hideReadDetails && (
        <small>
          Date Read: <strong>{book.date}</strong> | Status:{' '}
          <strong>{capitalizeFirstLetter(book.progress)}</strong>
          {book.rating && (
            <>
              {' '}
              | Rating: <strong>{book.rating}/10</strong>
            </>
          )}
          {book.purchase && (
            <>
              {' '}
              |{' '}
              <strong>
                <NextLink href={book.purchase}>Purchase</NextLink>
              </strong>
            </>
          )}
        </small>
      )}
      {book.desc && (
        <div className="bookshelf_desc">
          <Markdown>{book.desc}</Markdown>
        </div>
      )}
      {book.postLinks && (
        <>
          <div className="clearfix" />
          <strong>Posts referencing this book:</strong>
          <ul>{renderPostLinks()}</ul>
        </>
      )}
      <div className="clearfix" />
    </article>
  );
};

export default BookshelfItem;
