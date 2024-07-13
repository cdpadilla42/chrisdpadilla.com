import React from 'react';
import Markdown from 'markdown-to-jsx';
import { capitalizeFirstLetter } from '../lib/util';

const BookshelfItem = ({book}) => {
	return (
		<article key={book.name}>
			<figure className='bookshelf_image_wrapper'>
				<img src={book.image} className='bookshelf_image'/>
			</figure>
			<h3 id={book.slug}>{book.name} – By {book.author}</h3>
			<small>Date Read: <strong>{book.date}</strong> | Status: <strong>{capitalizeFirstLetter(book.progress)}</strong>{book.rating && <> | Rating: <strong>{book.rating}/10</strong></>}</small>
			{book.desc && (
				<p>
					 <Markdown>
						{book.desc}
      		</Markdown>
				</p>
			)}
			<div className="clearfix" />
		</article>
	);
};

export default BookshelfItem;