const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Clean markdown links from content for search indexing
 * Converts [text](url) to just "text" and ![alt](url) to "alt"
 * This prevents link URLs from appearing in search results
 */
function cleanMarkdownLinks(content) {
  if (!content) return '';

  let cleaned = content;

  // Remove image links: ![alt](url) or ![alt](url "title") → alt
  cleaned = cleaned.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1');

  // Remove regular links: [text](url) or [text](url "title") → text
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

  return cleaned;
}

function generateSearchIndex() {
  const postsDirectory = path.join(process.cwd(), '_posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        content: content || '',
        tags: data.tags || [],
        date: data.date || '',
        hidden: data.hidden || false,
      };
    });

  // Filter out hidden posts in production
  const visiblePosts = allPosts.filter((post) => {
    if (process.env.NODE_ENV === 'development') {
      return true;
    }
    return !post.hidden;
  });

  // Create search index with cleaned content
  const searchIndex = visiblePosts.map((post) => ({
    title: post.title,
    content: cleanMarkdownLinks(post.content),
    tags: post.tags,
    slug: post.slug,
    date: post.date,
  }));

  // Write to public directory
  const outputPath = path.join(process.cwd(), 'public', 'search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex));

  const sizeKB = (JSON.stringify(searchIndex).length / 1024).toFixed(2);
  console.log(
    `✅ Search index generated: ${searchIndex.length} posts, ${sizeKB} KB`
  );

  return searchIndex;
}

// Run the generator
generateSearchIndex();
