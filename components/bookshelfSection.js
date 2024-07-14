import React from 'react';
import NextLink from './NextLink';

const BookshelfSection = ({bookshelfPostList, bookshelf}) => {
	if (!bookshelfPostList) return <></>
	console.log(bookshelf)
	const renderBookShelfLinks = () => {
		return bookshelfPostList.map(slug => {
			const book = bookshelf?.[slug];
			if(!book) return <></>
			return <li><NextLink href={`/bookshelf#${slug}`}>{book.name} by {book.author}</NextLink> </li>
		})
	};



	return (
		<aside>
			<h4>
				See on the bookshelf:
				<ul>
					{renderBookShelfLinks()}
				</ul>
			</h4>
		</aside>
	);
};

export default BookshelfSection;