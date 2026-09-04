import { selectBlogListPost } from '../lib/blogList';

describe('blog list post projection', () => {
  test('keeps only fields needed by the archive list', () => {
    expect(
      selectBlogListPost({
        slug: 'example',
        title: 'Example',
        date: '2026-09-04T00:00:00.000Z',
        tags: ['Notes'],
        excerpt: 'Unused excerpt',
        coverImage: 'https://example.com/cover.jpg',
        hidden: false,
        content: 'A large body of Markdown content',
        bookshelf: ['a-book'],
      }),
    ).toEqual({
      slug: 'example',
      title: 'Example',
      date: '2026-09-04T00:00:00.000Z',
      tags: ['Notes'],
    });
  });
});
