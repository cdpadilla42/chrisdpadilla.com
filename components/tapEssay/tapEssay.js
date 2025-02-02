import Head from 'next/head';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useThrottledCallback } from 'use-debounce';
import { amethystPages } from './amethyst';

const TapEssay = ({ onComplete }) => {
  const pages = amethystPages;
  const [currentPage, setCurrentPage] = useState(0);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [bgc, setBgc] = useState('rgba(0,0,0,5)');
  const [color, setColor] = useState('rgba(0,0,0,5)');

  const onClick = () => {
    if (currentPage <= pages.length - 1) {
      if (currentParagraph < pages[currentPage].text.length - 1) {
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

  useEffect(() => {
    const newOverlaySettings = pages[currentPage]?.overlaySettings;
    console.log(newOverlaySettings);
    if (newOverlaySettings) {
      setBgc(newOverlaySettings.backgroundColor);
      setColor(newOverlaySettings.color);
    }
  }, [currentPage]);

  const throttledOnClick = useThrottledCallback(onClick, 2000);

  return (
    <>
      <div>
        <div
          className="tap-essay"
          style={{
            color,
            backgroundColor: bgc,
            cursor: 'pointer',
          }}
          onClick={throttledOnClick}
        >
          {pages.map((page, pageIndex) => {
            return (
              <CSSTransition
                in={pageIndex === currentPage}
                timeout={4000}
                classNames="fade"
                unmountOnExit
                key={`${pageIndex}`}
              >
                <p>
                  {page.text.map((paragraph, paragraphIndex) => {
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
      </div>
    </>
  );
};

export default TapEssay;
