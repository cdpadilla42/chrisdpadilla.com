import fs from 'fs';
import { getLatestHap } from '../lib/api';

jest.mock('remark', () => ({
  remark: jest.fn(() => ''),
}));

jest.mock('remark-html', () => '');

jest.mock('fs');

jest.mock('../lib/markdownAccess', () => ({
  getPostBySlug: () => ({ slug: '2023-01', tags: ['Notes', 'Haps'] }),
  getPostSlugs: () => ['2023-01'],
}));

test('getLatestHap', () => {
  const sampleMarkdownFile = { slug: '2023-01', tags: ['Notes', 'Haps'] };
  fs.readdirSync.mockResolvedValue([
    'postone.md',
    'posttwo.md',
    'postthree.md',
  ]);
  const result = getLatestHap();
  expect(result).toStrictEqual(sampleMarkdownFile);
});
