import PropTypes from 'prop-types';
import DateFormatter from '../components/date-formatter';
import Link from 'next/link';
import Avatar from '../components/avatar';
import CoverImage from './cover-image';
import { lowercaseFirstLetter } from '../lib/util';

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  tags,
}) {
  return (
    <>
      {/* <div className="article_preview__image_container">
        <CoverImage
          slug={slug}
          title={title}
          src={coverImage}
          height={278}
          width={556}
        />
      </div> */}
      <li className="bloglist_article" key={title}>
        <span className="bloglist_article_date">
          <DateFormatter dateString={date} />
        </span>
        <br />
        <Link href={`/${slug}`}>
          <a className="bloglist_article_title" data-test="blogPageLink">
            {title}
          </a>
        </Link>
        <ul className="bloglist_article_tags">
          {tags.map((tag) => (
            <li
              className="bloglist_article_tag"
              data-tag={tag}
              key={`${title}:${tag}`}
            >
              <Link href={`/blog/${lowercaseFirstLetter(tag)}`}>
                <a>{tag}</a>
              </Link>
            </li>
          ))}
        </ul>
      </li>
      {/* <div className="text-lg mb-4">
       
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p> */}
    </>
  );
}

PostPreview.propTypes = {
  tags: PropTypes.array,
};

PostPreview.defaultProps = {
  tags: [],
};
