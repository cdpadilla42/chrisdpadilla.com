import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const SearchContext = createContext();

// Pages where search keyboard shortcut should be disabled
const SEARCH_DISABLED_PAGES = [
  '/amethyst-zone',
  '/some-other-page',
  'moomoofilms/index.html',
];

export function SearchProvider({ children }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't handle search shortcut on disabled pages
      if (SEARCH_DISABLED_PAGES.includes(router.pathname)) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [router.pathname]);

  return (
    <SearchContext.Provider
      value={{
        searchModalOpen,
        setSearchModalOpen,
        openSearch: () => setSearchModalOpen(true),
        closeSearch: () => setSearchModalOpen(false),
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
