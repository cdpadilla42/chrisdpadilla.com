import Link from 'next/link';
import PostPreview from '../components/post-preview';

export default function MoreStories({ posts, tags }) {
  return (
    <section>
      <div className="heading_flex">
        <h2>Latest Posts</h2>
        <Link href="/blog">
          <a>
            <h2>See All</h2>
          </a>
        </Link>
      </div>
      <ul className="bloglist_index bloglist">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags.filter((tag) => tags.includes(tag))}
          />
        ))}
      </ul>
    </section>
  );
}
