import React from 'react';
import NextLink from '../../components/NextLink';

const BlogPageIntro = ({tag}) => {
	if (tag === 'Clippings') {
		return (
			<>
			<span>Links and snippets from across the web.</span><br />
			</>
		)
	}
	if (tag === 'Art') {
		return (
			<>
			<span>My sketches and illustrations!</span><br />
			</>
		)
	}
	if (tag === 'Music') {
		return (
			<>
			<span>Recordings across instruments!</span><br />
			</>
		)
	}
	if (tag === 'Books') {
		return (
			<>
			<span>Notes on favorite books. Full reading list on my <NextLink href="/bookshelf">Bookshelf</NextLink>.</span><br />
			</>
		)
	}
	if (tag === 'Notes') {
		return (
			<>
			<span>Personal essays.</span><br />
			</>
		)
	}
	if (tag === 'Tech') {
		return (
			<>
			<span>Articles on all things software!</span><br />
			</>
		)
	}
	return (
		<>
		<span>My passion project! Posts spanning music, art, software, books, and more</span><br />
		</>
	)
};

export default BlogPageIntro;