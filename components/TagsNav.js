import Link from 'next/link';
import React from 'react';
import { primaryTags } from '../lib/minorBlogTags';
import { lowercaseFirstLetter } from '../lib/util';

const TagsNav = () => {
  return (
    <ul className="tagslist">
      {primaryTags.map((tag) => (
        <li className="tagslist_tag" data-tag={tag} key={tag}>
          <Link href={`/blog/${lowercaseFirstLetter(tag)}`}>
            <a>{tag}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TagsNav;
