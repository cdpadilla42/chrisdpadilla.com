import markdownStyles from './markdown-styles.module.css';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import NextLink from './NextLink';
import { highlightCode } from '../lib/highlight';

export default function PostBody({ content }) {
  return (
    <div className="markdown">
      <Markdown
        options={{
          overrides: {
            a: NextLink,
            img: BlogImage,
            pre: PreBlock,
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}

// const BlogImage = (props) => <Image {...props} width={800} layout="fill" />;
export const BlogImage = (props) => (
  <a href={props.src} target="_blank" rel="noopener noreferrer">
    <img {...props} />
  </a>
);

const CodeBlock = ({ className, children }) => {
  children = highlightCode(children);
  return (
    <pre>
      <code dangerouslySetInnerHTML={{ __html: children }} />
    </pre>
  );
};

const PreBlock = ({ children, ...rest }) => {
  if ('type' in children && children['type'] === 'code') {
    return CodeBlock(children['props']);
  }

  return <pre {...rest}>{children}</pre>;
};
