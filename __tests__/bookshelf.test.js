import { bookshelf } from '../lib/bookshelf';

describe('bookshelf', () => {
  test('includes The Abundance with its completed-reading details', () => {
    expect(bookshelf.TheAbundance).toMatchObject({
      name: 'The Abundance: Narrative Essays Old and New',
      author: 'Annie Dillard',
      progress: 'read',
      date: '2017-09-30',
      slug: 'TheAbundance',
    });
  });
});
