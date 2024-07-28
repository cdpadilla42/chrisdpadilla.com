import React from 'react';
import Markdown from 'markdown-to-jsx';
import { capitalizeFirstLetter } from '../lib/util';
import NextLink from './NextLink';

const BookshelfItem = ({book}) => {

	const renderPostLinks = () => {
		return book.postLinks.map((linkObj) => {
				return (
					<>
						<li><NextLink href={linkObj.slug}>{linkObj.title}</NextLink> </li>
					</>
				)
		})
	}

	return (
		<article key={book.name}>
			<figure className='bookshelf_image_wrapper'>
				<img src={book.image} className='bookshelf_image'/>
			</figure>
			<h3 id={book.slug}>{book.name} – By {book.author}</h3>
			<small>Date Read: <strong>{book.date}</strong> | Status: <strong>{capitalizeFirstLetter(book.progress)}</strong>{book.rating && <> | Rating: <strong>{book.rating}/10</strong></>}{book.purchase && <> | <strong>
				<NextLink href={book.purchase} >Purchase</NextLink>
			</strong></>}</small>
			{book.desc && (
				<p>
					 <Markdown>
						{book.desc}
      		</Markdown>
				</p>
			)}
			{book.postLinks && (
				<>
				<strong>Posts referencing this book:</strong>
				<ul>

					{renderPostLinks()}
				</ul>
				</>
			)}
			<div className="clearfix" />
		</article>
	);
};

export default BookshelfItem;