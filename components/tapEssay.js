import Head from 'next/head';
import React, { useMemo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useThrottledCallback } from 'use-debounce';

const TapEssay = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState(0);

  const onClick = () => {
    if (currentPage <= pages.length - 1) {
      if (currentParagraph < pages[currentPage].length - 1) {
        setCurrentParagraph(currentParagraph + 1);
      } else {
        if (currentPage === pages.length - 1) {
          onComplete();
        } else {
          setCurrentPage(currentPage + 1);
          setCurrentParagraph(0);
        }
      }
    } else {
      onComplete();
    }
  };

  const throttledOnClick = useThrottledCallback(onClick, 2000);

  const pages = [
    [
      `
You feel the opening. A familiar sense of gently being called. This time only in a whisper, but you've become sensitive to the voice.`,
    ],
    ['This is a single page'],
    ['This, however... ', 'is a multipage!'],
  ];

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Charm:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div
        className="tap-essay"
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'rgba(225, 225, 225, 0.8)',
          cursor: 'pointer',
        }}
        onClick={throttledOnClick}
      >
        {pages.map((page, pageIndex) => {
          return (
            <CSSTransition
              in={pageIndex === currentPage}
              timeout={2000}
              classNames="fade"
              unmountOnExit
            >
              <p>
                {page.map((paragraph, paragraphIndex) => {
                  console.log(paragraphIndex);
                  console.log(currentParagraph);
                  console.log(paragraphIndex > currentParagraph);
                  return (
                    <span
                      key={paragraph}
                      style={{
                        color:
                          paragraphIndex > currentParagraph
                            ? 'rgba(225,225,225,0)'
                            : 'rgba(225,225,225,1)',
                      }}
                    >
                      {paragraph}
                    </span>
                  );
                })}
              </p>
            </CSSTransition>
          );
        })}
      </div>
    </>
  );
};

export default TapEssay;
