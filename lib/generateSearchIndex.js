import fs from 'fs';
import path from 'path';
import { getAllPosts } from './api';
import { filterBlogPosts } from './util';

export function generateSearchIndex() {
  // Get all posts with the fields needed for search
  const allPosts = getAllPosts([
    'title',
    'excerpt',
    'content',
    'tags',
    'slug',
    'date',
  ]);

  // Filter to only include visible posts (not hidden, and respects production date filtering)
  const visiblePosts = allPosts.filter(filterBlogPosts);

  // Create search index with optimized data structure
  const searchIndex = visiblePosts.map((post) => ({
    title: post.title || '',
    excerpt: post.excerpt || '',
    content: post.content || '',
    tags: post.tags || [],
    slug: post.slug,
    date: post.date,
  }));

  // Write to public directory
  const outputPath = path.join(process.cwd(), 'public', 'search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));

  console.log(
    `✅ Search index generated: ${searchIndex.length} posts, ${(
      JSON.stringify(searchIndex).length / 1024
    ).toFixed(2)} KB`
  );

  return searchIndex;
}

// Allow running this script directly
if (require.main === module) {
  generateSearchIndex();
}
