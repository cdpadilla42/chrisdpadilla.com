import { useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { musicShelf } from '../lib/musicShelf';

export default function MusicShelfPage({ albums }) {
  const [sortBy, setSortBy] = useState('yearListened');

  const normalizeSortText = (value) =>
    (value || '').trim().replace(/^the\s+/i, '');

  const sortedAlbums = useMemo(() => {
    const list = [...albums];

    if (sortBy === 'artist') {
      return list.sort((a, b) => {
        const artistOrder = normalizeSortText(a.artist).localeCompare(
          normalizeSortText(b.artist),
          undefined,
          {
            sensitivity: 'base',
          },
        );
        if (artistOrder !== 0) return artistOrder;
        return normalizeSortText(a.title).localeCompare(
          normalizeSortText(b.title),
          undefined,
          {
            sensitivity: 'base',
          },
        );
      });
    }

    if (sortBy === 'title') {
      return list.sort((a, b) =>
        normalizeSortText(a.title).localeCompare(
          normalizeSortText(b.title),
          undefined,
          {
            sensitivity: 'base',
          },
        ),
      );
    }

    return list.sort((a, b) => {
      const yearA =
        typeof a.yearListened === 'number' ? a.yearListened : -Infinity;
      const yearB =
        typeof b.yearListened === 'number' ? b.yearListened : -Infinity;
      if (yearA !== yearB) return yearB - yearA;

      const dateA = Date.parse(a.date || '');
      const dateB = Date.parse(b.date || '');
      const hasDateA = Number.isFinite(dateA);
      const hasDateB = Number.isFinite(dateB);
      if (hasDateA && hasDateB && dateA !== dateB) return dateB - dateA;
      if (hasDateA !== hasDateB) return hasDateA ? -1 : 1;

      const artistOrder = normalizeSortText(a.artist).localeCompare(
        normalizeSortText(b.artist),
        undefined,
        {
          sensitivity: 'base',
        },
      );
      if (artistOrder !== 0) return artistOrder;
      return (a.title || '').localeCompare(b.title || '', undefined, {
        sensitivity: 'base',
      });
    });
  }, [albums, sortBy]);

  return (
    <>
      <Head>
        <title>Music Shelf | Chris Padilla</title>
      </Head>
      <main className="musicShelfPage">
        <h1>
          <Link href="/">
            <a>Chris Padilla</a>
          </Link>{' '}
          / Music Shelf
        </h1>
        <div className="controls">
          <div className="count">{albums.length} albums</div>
          <label htmlFor="music-shelf-sort" className="sortLabel">
            Sort:
          </label>
          <select
            id="music-shelf-sort"
            className="sortSelect"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="yearListened">Year Listened</option>
            <option value="artist">Artist (Alpha)</option>
            <option value="title">Album Title (Alpha)</option>
          </select>
        </div>
        <div className="grid">
          {sortedAlbums.map((album) => (
            <div className="album" key={album.slug}>
              <img src={album.image || ''} alt={album.title} loading="lazy" />
              <div className="title" title={album.title}>
                {album.title}
              </div>
              <div className="artist" title={album.artist}>
                {album.artist}
              </div>
              {typeof album.yearListened === 'number' ? (
                <div className="yearListened">
                  Listened: {album.yearListened}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </main>
      <style jsx global>{`
        body {
          background: #121212;
          color: #fff;
          font-family:
            -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 24px;
        }
      `}</style>
      <style jsx>{`
        .musicShelfPage,
        .musicShelfPage * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .musicShelfPage {
          width: 100%;
          max-width: none;
          margin: 0;
          padding: 0;
        }

        h1 {
          margin-bottom: 8px;
          font-size: 24px;
        }

        .count {
          color: #a0a0a0;
          font-size: 14px;
          margin-right: 12px;
        }

        .controls {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }

        .sortLabel {
          color: #a0a0a0;
          font-size: 13px;
        }

        .sortSelect {
          border: 1px solid #3a3a3a;
          border-radius: 4px;
          background: #1a1a1a;
          color: #fff;
          font-size: 13px;
          padding: 6px 8px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 16px;
        }

        .album {
          text-align: center;
        }

        .album img {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          border-radius: 4px;
          background: #282828;
        }

        .album .title {
          margin-top: 6px;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .album .artist {
          font-size: 12px;
          color: #a0a0a0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .album .yearListened {
          margin-top: 2px;
          font-size: 11px;
          color: #7f7f7f;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      albums: Object.values(musicShelf),
    },
  };
}
