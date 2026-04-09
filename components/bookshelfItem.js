import React from 'react';
import Markdown from 'markdown-to-jsx';
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
    <article key={book.name} className="bookshelf_item">
      <figure className="bookshelf_image_wrapper">
        <img src={book.image} className="bookshelf_image" />
      </figure>
      <h3 id={book.slug} className="bookshelf_title">
        {linkInTitle && book.purchase ? (
          <NextLink href={book.purchase}>{book.name}</NextLink>
        ) : (
          book.name
        )}{' '}
        – by {book.author}
      </h3>
      {!hideReadDetails && (
        <small className="bookshelf_meta">
          Date: <strong>{book.date}</strong>
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
        <div
          className={`bookshelf_desc ${
            hideReadDetails ? 'bookshelf_desc__compact' : ''
          }`.trim()}
        >
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
