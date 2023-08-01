import Link from 'next/link';
import React from 'react';

const RssSvg = () => {
  return (
    <Link href="/api/feed">
      <a>
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height="32"
          width="32"
          style={{ position: 'relative', top: '4px' }}
        >
          <path
            fill="currentColor"
            d="M 4 4.44 v 2.83 c 7.03 0 12.73 5.7 12.73 12.73 h 2.83 c 0 -8.59 -6.97 -15.56 -15.56 -15.56 Z m 0 5.66 v 2.83 c 3.9 0 7.07 3.17 7.07 7.07 h 2.83 c 0 -5.47 -4.43 -9.9 -9.9 -9.9 Z M 6.18 15.64 A 2.18 2.18 0 0 1 6.18 20 A 2.18 2.18 0 0 1 6.18 15.64"
          ></path>
        </svg>
      </a>
    </Link>
  );
};

export default RssSvg;
