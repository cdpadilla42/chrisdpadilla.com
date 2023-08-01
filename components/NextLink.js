import Link from 'next/link';
import React from 'react';

const NextLink = ({ children, ...props }) => {
  let newWindowAttr = {};
  if (props.href.includes('http')) {
    newWindowAttr = {
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }
  return (
    <Link {...props}>
      {children}
    </Link>
  );
};

export default NextLink;
