import Avatar from '../components/avatar';
import DateFormatter from '../components/date-formatter';
import CoverImage from '../components/cover-image';
import PostTitle from '../components/post-title';

export default function PostHeader({ title, coverImage, date, tags }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div>
        <div>
          <DateFormatter dateString={date} />
        </div>
        {/* <div className="tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div> */}
      </div>
      <div>
        <CoverImage title={title} src={coverImage} height={620} width={1240} />
      </div>
    </>
  );
}
