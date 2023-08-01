import Avatar from '../components/avatar';
import DateFormatter from '../components/date-formatter';
import CoverImage from '../components/cover-image';
import PostTitle from '../components/post-title';
import Link from 'next/link';
import { lowercaseFirstLetter } from '../lib/util';

export default function PostHeader({ title, coverImage, date, tags, prelude }) {
  return <>
    <PostTitle>{title}</PostTitle>
    {prelude && <p>{prelude}</p>}
    <div>
      <div>
        <DateFormatter dateString={date} />
      </div>
      <div className="tags">
        {tags.map((tag, i) => (
          (<Link
            href={`/blog/${lowercaseFirstLetter(tag)}`}
            key={tag}
            className="tagslist_tag"
            data-tag={tag}>

            {tag}

          </Link>)
        ))}
      </div>
    </div>
    <div>
      <CoverImage title={title} src={coverImage} height={620} width={1240} />
    </div>
  </>;
}
