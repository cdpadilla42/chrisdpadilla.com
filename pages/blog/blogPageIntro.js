import React from 'react';
import NextLink from '../../components/NextLink';
import Link from 'next/link';
import { lowercaseFirstLetter } from '../../lib/util';

const BlogPageIntro = ({tag}) => {
	if (tag === 'Clippings') {
		return (
			<>
			<p><span>Links and snippets from across the web.</span><br /></p>
			</>
		)
	}
	if (tag === 'Art') {
		return (
			<>
			<p><span>My sketches and illustrations!</span><br /></p>
			</>
		)
	}
	if (tag === 'Music') {
		const musicTags = ['Piano', 'Guitar', 'Jazz', 'Improv'];
		return (
			<>
			<p>Regular recordings across instruments!<br/>
			Here are some common themes that you can explore:
			</p>
			 <ul className="tagslist">
				{musicTags.map((tag) => (
					<li className="tagslist_tag" data-tag={tag} key={tag}>
						<a href={`/blog/${lowercaseFirstLetter(tag)}`} passHref>
							{tag}
						</a>
					</li>
				))}
			</ul>
			</>
		)
	}
	if (tag === 'Guitar') {
		const musicTags = ['Electric Guitar', 'Acoustic Guitar', 'Chord Melody', 'Improv'];
		return (
			<>
			<p>Noodles across strings.<br/>
			Here are some common themes that you can explore:
			</p>
			 <ul className="tagslist">
				{musicTags.map((tag) => (
					<li className="tagslist_tag" data-tag={tag} key={tag}>
						<a href={`/blog/${lowercaseFirstLetter(tag)}`} >
							{tag}
						</a>
					</li>
				))}
			</ul>
			</>
		)
	}
	if (tag === 'Books') {
		return (
			<>
			<p><span>Notes on favorite books. Full reading list on my <NextLink href="/bookshelf">Bookshelf</NextLink>.</span><br /></p>
			</>
		)
	}
	if (tag === 'Chris Learns Piano') {
		return (
			<>
			<p>I've been dabbling most of my life, but I decided to really go in on learning piano in 2022. Here are my first few forays!</p>
			</>
		)
	}
	if (tag === 'Piano') {
		const pianoTags = ['Jazz', 'Acoustic Piano', 'Chris Learns Piano']
		return (
			<>
			<p>Ebony and Ivory...<br/>
			Here are some common themes that you can explore:
			</p>
			 <ul className="tagslist">
				{pianoTags.map((tag) => (
					<li className="tagslist_tag" data-tag={tag} key={tag}>
						<a href={`/blog/${lowercaseFirstLetter(tag)}`}>
							{tag}
						</a>
					</li>
				))}
			</ul>
			</>
		)
	}
	if (tag === 'Notes') {
		return (
			<>
			<p><span>Personal essays.</span><br /></p>
			</>
		)
	}
	if (tag === 'Tech') {
		return (
			<>
			<p><span>Articles on all things software!</span><br /></p>
			</>
		)
	}
	if (!tag) {

		return (
			<>
		<p><span>My passion project! Posts spanning music, art, software, books, and more</span><br /></p>
		</>
			)
		}
		return null;
};

export default BlogPageIntro;