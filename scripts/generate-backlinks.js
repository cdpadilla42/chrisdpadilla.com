const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Extract internal links from markdown content
 * Matches [text](/slug) pattern
 */
function getInternalLinksFromMarkdown(md) {
  const regex = /(?:__|[*#])|\[(.*?)\]\(\/(.*?)\)/g;
  return Array.from(md.matchAll(regex))
    .map((res) => {
      if (res && res.length > 1) {
        return res[2];
      }
    })
    .filter(Boolean);
}

function generateBacklinks() {
  const postsDirectory = path.join(process.cwd(), '_posts');
  const fileNames = fs.readdirSync(postsDirectory);

  // Read all posts
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
        content: content || '',
        bookshelf: data.bookshelf || [],
        date: data.date,
      };
    })
    // Filter posts by date (only include published posts)
    .filter((post) => new Date(post.date) <= new Date());

  // Generate backlinks and bookshelf links
  const links = {};
  const bookLinks = {};

  allPosts.forEach((post) => {
    // Extract internal blog links
    const postLinks = getInternalLinksFromMarkdown(post.content);
    postLinks.forEach((targetSlug) => {
      if (targetSlug && !targetSlug.includes('/')) {
        if (!links[targetSlug]) {
          links[targetSlug] = [];
        }
        // Avoid duplicates
        if (!links[targetSlug].find((entry) => entry.slug === post.slug)) {
          links[targetSlug].push({
            slug: post.slug,
            title: post.title,
          });
        }
      }
    });

    // Extract bookshelf references from frontmatter
    if (post.bookshelf && Array.isArray(post.bookshelf)) {
      for (const bookSlug of post.bookshelf) {
        if (!bookLinks[bookSlug]) {
          bookLinks[bookSlug] = [];
        }
        bookLinks[bookSlug].push({
          slug: post.slug,
          title: post.title,
        });
      }
    }
  });

  // Ensure _cache directory exists
  const cacheDir = path.join(process.cwd(), '_cache');
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  // Write backlinks.json
  const backlinksPath = path.join(cacheDir, 'backlinks.json');
  fs.writeFileSync(backlinksPath, JSON.stringify(links, null, 2));

  // Write bookshelfLinks.json
  const bookshelfLinksPath = path.join(cacheDir, 'bookshelfLinks.json');
  fs.writeFileSync(bookshelfLinksPath, JSON.stringify(bookLinks, null, 2));

  const backlinksCount = Object.keys(links).length;
  const bookLinksCount = Object.keys(bookLinks).length;

  console.log(
    `✅ Backlinks generated: ${backlinksCount} posts with backlinks`
  );
  console.log(
    `✅ Bookshelf links generated: ${bookLinksCount} books referenced`
  );
}

// Run the generator
generateBacklinks();
