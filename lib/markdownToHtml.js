import { remark } from 'remark';
import html from 'remark-html';
import strip from 'strip-markdown';

export default async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export async function markdownToString(markdown) {
  const result = await remark().use(strip).process(markdown);
  return result.toString();
}

export async function convertPostsContentToHtml(posts) {
  return Promise.all(
    posts.map(async (post) => {
      const newPost = { ...post };
      const newContent = await markdownToHtml(post.content);
      newPost.content = newContent;
      return newPost;
    })
  );
}
