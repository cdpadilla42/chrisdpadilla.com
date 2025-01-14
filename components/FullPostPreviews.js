import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import queryString from 'query-string';
import PostHeader from './post-header';
import PostBody from './post-body';
import { FULL_POST_PAGE_LIMIT } from '../lib/constants';

const FullPostPreviews = ({ posts, count }) => {
  const router = useRouter();
  const query = { ...router.query };
  const currentPage = parseInt(query.p) || 1;
  const lastPage = Math.ceil(count / FULL_POST_PAGE_LIMIT);

  const parseQuery = {...query};
  delete parseQuery.tag;

  const basePath = router.asPath.split("?")[0]; 



  return (
    <div>
      <ul className="bloglist">
        {posts.length > 0 &&
          posts.map((post) => (
            <>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
              />
              <PostBody content={post.content} />
              <hr style={{'margin': '4rem 0'}}></hr>
            </>
          ))}
      </ul>
      <div className="pagination-controller" style={{ display: 'flex' }}>
        <div className="left" style={{ flex: '1' }}>
          {currentPage !== 1 && (
            <a
              href={`${basePath}?${queryString.stringify({
                ...parseQuery,
                p: parseInt(query.p) - 1,
              })}`}
            >
              Back
            </a>
          )}
        </div>
        <div className="right" style={{ flex: '1', textAlign: 'right' }}>
          {currentPage < lastPage && (
            <a
              href={`${basePath}?${queryString.stringify({
                ...parseQuery,
                p: parseInt(query.p || 1) + 1,
              })}`}
            >
              Next
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullPostPreviews;
