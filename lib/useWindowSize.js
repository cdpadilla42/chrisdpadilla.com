import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({});

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    if (typeof window !== undefined) {
      window.addEventListener('resize', handleResize);
      window.addEventListener('load', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    return {};
  }, []);

  return windowSize;
}
