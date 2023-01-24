import markdownStyles from './markdown-styles.module.css';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import Image from 'next/image';
import NextLink from './NextLink';

export default function PostBody({ content }) {
  return (
    <div className="markdown">
      <Markdown
        options={{
          overrides: {
            a: NextLink,
            img: BlogImage,
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}

// const BlogImage = (props) => <Image {...props} width={800} layout="fill" />;
const BlogImage = (props) => (
  <a href={props.src} target="_blank" rel="noopener noreferrer">
    <img {...props} />
  </a>
);
