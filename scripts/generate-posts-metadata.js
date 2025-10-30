const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Generate posts metadata JSON file for fast page loads
 * This eliminates filesystem I/O on every request by pre-computing
 * all post metadata at build time
 */
function generatePostsMetadata() {
  const postsDirectory = path.join(process.cwd(), '_posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Include all common frontmatter fields
      // Note: Include content for flexibility, but pages can choose not to use it
      return {
        slug,
        title: data.title || '',
        date: data.date ? new Date(data.date).toISOString() : '',
        excerpt: data.excerpt || '',
        coverImage: data.coverImage || '',
        tags: data.tags || [],
        hidden: data.hidden || false,
        artGridIgnore: data.artGridIgnore || false,
        bookshelf: data.bookshelf || [],
        content: content || '', // Full markdown content for pages that need it
      };
    })
    // Sort by date descending (newest first) - same as getAllPosts()
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  const outputPath = path.join(process.cwd(), 'public', 'posts-metadata.json');
  fs.writeFileSync(outputPath, JSON.stringify(allPosts));

  const sizeKB = (JSON.stringify(allPosts).length / 1024).toFixed(2);
  console.log(
    `✅ Posts metadata generated: ${allPosts.length} posts, ${sizeKB} KB`
  );

  return allPosts;
}

generatePostsMetadata();
