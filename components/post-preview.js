import Avatar from '../components/avatar';
import DateFormatter from '../components/date-formatter';
import CoverImage from './cover-image';
import Link from 'next/link';

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
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
      <h3>
        <Link href={`/${slug}`}>
          <a>{title}</a>
        </Link>
      </h3>
      {/* <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p> */}
    </>
  );
}
