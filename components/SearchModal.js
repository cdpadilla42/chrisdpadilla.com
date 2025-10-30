import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';

export default function SearchModal({ isOpen, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const selectedResultRef = useRef(null);

  // Load search index and Fuse.js when modal opens
  useEffect(() => {
    if (isOpen && !fuse) {
      setLoading(true);
      Promise.all([
        import('fuse.js'),
        fetch('/search-index.json').then((res) => res.json()),
      ])
        .then(([FuseModule, searchIndex]) => {
          const Fuse = FuseModule.default;
          const fuseInstance = new Fuse(searchIndex, {
            keys: [
              { name: 'title', weight: 0.5 },
              { name: 'content', weight: 0.4 },
              { name: 'tags', weight: 0.1 },
            ],
            threshold: 0.2,
            ignoreLocation: true,
            includeScore: true,
            minMatchCharLength: 2,
          });
          setFuse(fuseInstance);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading search:', error);
          setLoading(false);
        });
    }
  }, [isOpen, fuse]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Perform search when query changes
  useEffect(() => {
    if (fuse && debouncedQuery.trim()) {
      const searchResults = fuse.search(debouncedQuery);
      setResults(searchResults.slice(0, 10)); // Top 10 results
      setSelectedIndex(0); // Reset selection
    } else {
      setResults([]);
      setSelectedIndex(0);
    }
  }, [debouncedQuery, fuse]);

  // Auto-scroll selected result into view
  useEffect(() => {
    if (selectedResultRef.current) {
      selectedResultRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            router.push(`/${results[selectedIndex].item.slug}`);
            onClose();
            setQuery('');
          }
          break;
      }
    },
    [isOpen, results, selectedIndex, router, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Handle click outside
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
      setQuery('');
    }
  };

  // Reset state when closing
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="search-modal-backdrop" onClick={handleBackdropClick}>
      <div className="search-modal" ref={modalRef}>
        <div className="search-input-container">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
          <kbd className="search-shortcut">ESC</kbd>
        </div>

        {loading && (
          <div className="search-loading">Loading search index...</div>
        )}

        {!loading && query && results.length === 0 && (
          <div className="search-no-results">
            No results found for "{query}"
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="search-results">
            {results.map((result, index) => (
              <Link href={`/${result.item.slug}`} key={result.item.slug}>
                <a
                  ref={index === selectedIndex ? selectedResultRef : null}
                  className={`search-result-item ${
                    index === selectedIndex ? 'selected' : ''
                  }`}
                  onClick={() => {
                    onClose();
                    setQuery('');
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="search-result-title">{result.item.title}</div>
                  {result.item.excerpt && (
                    <div className="search-result-excerpt">
                      {result.item.excerpt}
                    </div>
                  )}
                  {result.item.tags && result.item.tags.length > 0 && (
                    <div className="search-result-tags">
                      {result.item.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="search-result-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              </Link>
            ))}
          </div>
        )}

        {!loading && !query && (
          <div className="search-instructions">
            <div>
              <strong>Tip:</strong> Press <kbd>↑</kbd> <kbd>↓</kbd> to navigate
            </div>
            <div>
              Press <kbd>Enter</kbd> to select
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .search-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 4rem 1rem;
          z-index: 1000;
          overflow-y: auto;
        }

        .search-modal {
          background-color: var(--black);
          border: 2px solid var(--blue);
          border-radius: 8px;
          width: 100%;
          max-width: 600px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .search-input-container {
          display: flex;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid var(--blue);
          gap: 0.5rem;
        }

        .search-input {
          flex: 1;
          background-color: transparent;
          border: none;
          color: var(--white);
          font-size: 1.2rem;
          font-family: var(--font-family);
          outline: none;
        }

        .search-input::placeholder {
          color: var(--white);
          opacity: 0.5;
        }

        .search-shortcut {
          background-color: var(--code-black);
          color: var(--code-font-color);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.9rem;
          font-family: monospace;
          border: 1px solid var(--white);
          opacity: 0.6;
        }

        .search-results {
          overflow-y: auto;
          max-height: 60vh;
        }

        .search-result-item {
          display: block;
          padding: 1rem;
          border-bottom: 1px solid rgba(78, 205, 196, 0.2);
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }

        .search-result-item:hover,
        .search-result-item.selected {
          background-color: rgba(78, 205, 196, 0.1);
        }

        .search-result-title {
          color: var(--yellow);
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .search-result-excerpt {
          color: var(--white);
          font-size: 0.95rem;
          opacity: 0.8;
          margin-bottom: 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .search-result-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .search-result-tag {
          background-color: var(--code-black);
          color: var(--blue);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
        }

        .search-loading,
        .search-no-results,
        .search-instructions {
          padding: 2rem;
          text-align: center;
          color: var(--white);
          opacity: 0.7;
        }

        .search-instructions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .search-instructions kbd {
          background-color: var(--code-black);
          color: var(--code-font-color);
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9rem;
          font-family: monospace;
          border: 1px solid var(--white);
          opacity: 0.8;
          margin: 0 0.2rem;
        }

        @media (max-width: 600px) {
          .search-modal-backdrop {
            padding: 1rem;
          }

          .search-modal {
            max-height: 90vh;
          }

          .search-input {
            font-size: 1rem;
          }

          .search-result-item {
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
