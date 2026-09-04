import { SUPPORTED_LANGUAGES, highlightCode } from '../lib/highlight';

describe('syntax highlighting', () => {
  test('supports the languages used by the blog', () => {
    expect(SUPPORTED_LANGUAGES).toEqual([
      'bash',
      'java',
      'javascript',
      'json',
      'python',
      'swift',
      'typescript',
      'xml',
      'yaml',
    ]);
  });

  test('highlights JavaScript using the reduced language set', () => {
    const highlighted = highlightCode('const answer = 42;');
    expect(highlighted).toContain('hljs-');
    expect(highlighted).toContain('answer');
  });

  test('uses JavaScript grammar for JSX snippets', () => {
    expect(highlightCode('const element = <div />;')).toContain('hljs-tag');
  });
});
