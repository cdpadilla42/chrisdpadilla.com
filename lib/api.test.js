import { getAlbums, getAllPosts } from './api';

test('Verify no conflicting slugs', () => {
  const albums = getAlbums();
  const posts = getAllPosts(['slug']);

  const slugs = {};
  const recurringSlug = [];

  const verifyUniqueSlug = (item) => {
    const { slug } = item;
    if (slugs[slug]) {
      // Fail test
      recurringSlug.push(slug);
    }
    slugs[slug] = true;
  };

  albums.forEach(verifyUniqueSlug);
  posts.forEach(verifyUniqueSlug);
  expect(recurringSlug).toEqual([]);
});
