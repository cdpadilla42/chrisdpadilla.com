import React from 'react';
import NextLink from './NextLink';

const BacklinksSection = ({pagesLinkingBackTo}) => {
	if (!pagesLinkingBackTo) return <></>
	return (
		<aside>
			<h4>
				Pages refferencing this post:
				<ul>

				{pagesLinkingBackTo.map(link => (
					<li><NextLink href={link.slug}>{link.title}</NextLink> </li>
				))}
				</ul>
			</h4>
		</aside>
	);
};

export default BacklinksSection;