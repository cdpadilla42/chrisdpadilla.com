import Link from 'next/link';
import PostPreview from '../components/post-preview';
import { primaryTags } from '../lib/minorBlogTags';
import TagsNav from './TagsNav';

export default function MoreStories({ latestPosts, featuredPosts }) {
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
      <TagsNav />
      <ul className="bloglist_index bloglist">
        {latestPosts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags.filter((tag) => primaryTags.includes(tag))}
          />
        ))}
      </ul>
      <div className="heading_flex">
        <h2>Featured Articles</h2>
      </div>
      <ul className="bloglist_index bloglist">
        {featuredPosts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags.filter((tag) => primaryTags.includes(tag))}
          />
        ))}
      </ul>
    </section>
  );
}
