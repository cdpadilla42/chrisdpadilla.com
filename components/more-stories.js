import PostPreview from '../components/post-preview';

export default function MoreStories({ posts }) {
  return (
    <section>
      <div className="heading_flex">
        <h2>Latest Posts</h2>
        {/* <a href="">
          <h2>See All</h2>
        </a> */}
      </div>

      {posts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
          slug={post.slug}
          excerpt={post.excerpt}
        />
      ))}
    </section>
  );
}
