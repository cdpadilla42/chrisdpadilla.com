import React from 'react';
import NextLink from '../../components/NextLink';
import Link from 'next/link';
import { capitalizeFirstLetter, lowercaseFirstLetter } from '../../lib/util';
import { ART_SUB_TAGS } from '../../lib/constants';

const BlogPageIntro = ({tag}) => {
	if (tag === 'Clippings') {
		return (
			<>
			<hr />
			<p><span>Links and snippets from across the web.</span><br /></p>
			</>
		)
	}
	if (tag === 'Art') {
		
		return (
			<>
			<hr />
			<p>Making pictures!</p>
			<p> I doodled some as a kid, but assumed I didn't have talent, so I never pursued it seriously. In 2022, inspiration struck, and I decided to take a swing at learning the craft!</p>
			<p>I've been documenting my journey ever since. I've written about the lessons I've learned from <a href="/lessonsfromdrawing2023">drawing in 2023</a> and <a href="/lessonsfrompainting2024">digital painting in 2024</a> as Notes on this blog.</p>
			<p>Some common themes:</p>
			 <ul className="tagslist">
				{ART_SUB_TAGS.map((tag) => (
					<li className="tagslist_tag" data-tag={tag} key={tag}>
						<a href={`/blog/${lowercaseFirstLetter(tag)}`} passHref>
							{capitalizeFirstLetter(tag)}
						</a>
					</li>
				))}
			</ul>
			</>
		)
	}
	if (tag === 'Music') {
		const musicTags = ['Piano', 'Guitar', 'Jazz', 'Improv'];
		return (
			<>
			<hr />
			<p>Feed for regular recordings across instruments! You can find my <a href="/music">originally composed albums here</a>.</p>
			<p>
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
			<hr />
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
			<hr />
			<p><span>Notes on favorite books. Full reading list on my <NextLink href="/bookshelf">Bookshelf</NextLink>.</span><br /></p>
			</>
		)
	}
	if (tag === 'Chris Learns Piano') {
		return (
			<>
			<hr />
			<p>I've been dabbling most of my life, but I decided to really go in on learning piano in 2022. Here are my first few forays!</p>
			</>
		)
	}
	if (tag === 'Piano') {
		const pianoTags = ['Jazz', 'Acoustic Piano', 'Chris Learns Piano']
		return (
			<>
			<hr />
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
			<hr />
			<p><span>Personal essays. I write often on <a href="/blog/creativity">creativity</a>. I also write <a href="/blog/annuals">annual reflections</a> for key milestones.</span> When I have a chance to read a good book, I <a href="/blog/books">share my favorite bits</a>.</p>
			</>
		)
	}
	if (tag === 'Tech') {
		return (
			<>
			<hr />
			<p><span>Articles on all things software! </span>
			You can peruse by programming language, such as <a href="/blog/javaScript">JavaScript</a> or <a href="/blog/python">Python</a>. Or perhaps domain, such as <a href="/blog/testing">testing</a> or <a href="/blog/architecture">architecture</a>.</p>
			</>
		)
	}
	if (tag === 'Lucy') {
		return (
			<>
			<hr />
			<p><span>Sweet pup. A dear muse.</span></p>
			</>
		)
	}
	if (tag === 'Chris Learns to Draw') {
		return (
			<>
			<hr />
			<p><span>In 2022, I went from only having ever doodled as a kid to learning to draw. I had a blast and it really freed up the looseness in all of my creative practices (including software!) Here is my journey documented. You can read my reflection on <a href="/lessonsfromdrawing2023">Lessons From A Year of Drawing here</a>.</span></p>
			</>
		)
	}
	if (tag === 'Chris Learns Digital Painting') {
		return (
			<>
			<hr />
			<p><span>I had so much fun <a href="/blog/chris%20Learns%20to%20Draw">learning to draw</a> that I wanted to explore another visual medium! In 2023, I dove into digital art. You can read my <a href="/lessonsfrompainting2024">Lessons From A Year of Digital Painting here</a>.</span></p>
			</>
		)
	}
	if (!tag) {

		return (
			<>
			<hr />
		<p><span>My passion project! Posts spanning music, art, software, books, and more.</span><br /></p>
		</>
			)
		}
		return null;
};

export default BlogPageIntro;