import Head from 'next/head';
import Link from 'next/link';
import { topSongsByYear } from '../../lib/topSongsByYear';

export default function TopSongsYearPage({ year, songs, availableYears }) {
  const currentYearIndex = availableYears.indexOf(year);
  const previousYear =
    currentYearIndex > 0 ? availableYears[currentYearIndex - 1] : null;
  const nextYear =
    currentYearIndex >= 0 && currentYearIndex < availableYears.length - 1
      ? availableYears[currentYearIndex + 1]
      : null;

  return (
    <>
      <Head>
        <title>Top Songs {year} | Chris Padilla</title>
      </Head>
      <main className="topSongsPage">
        <h1>
          <Link href="/">
            <a>Chris Padilla</a>
          </Link>{' '}
          / Top Songs / {year}
        </h1>

        <div className="metaRow">
          <div className="count">{songs.length} tracks</div>
          <div className="yearNav">
            {previousYear ? (
              <Link href={`/topsongs/${previousYear}`}>
                <a>← {previousYear}</a>
              </Link>
            ) : (
              <span />
            )}
            {nextYear ? (
              <Link href={`/topsongs/${nextYear}`}>
                <a>{nextYear} →</a>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>

        <section className="table" aria-label={`Top songs ${year}`}>
          <div className="row header">
            <div className="col rank">#</div>
            <div className="col title">Title</div>
            <div className="col album">Album</div>
          </div>

          {songs.map((song) => (
            <div className="row" key={song.trackUri || `${song.rank}-${song.track}`}>
              <div className="col rank">{song.rank}</div>
              <div className="col titleCell">
                <img
                  src={song.image || ''}
                  alt={song.album}
                  loading="lazy"
                  className={song.image ? '' : 'placeholder'}
                />
                <div className="textBlock">
                  <div className="track" title={song.track}>
                    {song.track}
                  </div>
                  <div className="artist" title={song.artist}>
                    {song.artist}
                  </div>
                </div>
              </div>
              <div className="col albumCell" title={song.album}>
                {song.album}
              </div>
            </div>
          ))}
        </section>
      </main>

      <style jsx global>{`
        body {
          background: linear-gradient(180deg, #2c0f15 0, #121212 180px);
          color: #fff;
          font-family:
            -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          margin: 0;
          padding: 24px 12px;
        }
      `}</style>

      <style jsx>{`
        .topSongsPage {
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
        }

        h1 {
          margin: 0 0 14px;
          font-size: 24px;
          font-weight: 700;
        }

        .metaRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          color: #b3b3b3;
          font-size: 14px;
        }

        .yearNav {
          display: flex;
          gap: 12px;
          min-width: 112px;
          justify-content: space-between;
        }

        .table {
          border-radius: 10px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.22);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .row {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr) minmax(120px, 35%);
          align-items: center;
          gap: 10px;
          min-height: 66px;
          padding: 6px 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .row:first-child {
          border-top: 0;
        }

        .row:not(.header):hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .header {
          min-height: 42px;
          background: rgba(0, 0, 0, 0.2);
          color: #b3b3b3;
          font-size: 13px;
        }

        .rank {
          color: #b3b3b3;
          text-align: center;
          font-variant-numeric: tabular-nums;
        }

        .titleCell {
          display: flex;
          align-items: center;
          min-width: 0;
          gap: 12px;
        }

        .titleCell img {
          width: 44px;
          height: 44px;
          object-fit: cover;
          border-radius: 4px;
          background: #282828;
          flex: 0 0 44px;
        }

        .titleCell img.placeholder {
          visibility: hidden;
        }

        .textBlock {
          min-width: 0;
        }

        .track {
          font-size: 17px;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .artist {
          font-size: 14px;
          color: #b3b3b3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 2px;
        }

        .albumCell {
          color: #b3b3b3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 720px) {
          .row {
            grid-template-columns: 38px minmax(0, 1fr);
          }

          .album,
          .albumCell {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  const years = Object.keys(topSongsByYear);
  return {
    paths: years.map((year) => ({ params: { year } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const year = Number(params.year);
  const songs = topSongsByYear[year] || null;

  if (!songs) {
    return { notFound: true };
  }

  return {
    props: {
      year,
      songs,
      availableYears: Object.keys(topSongsByYear).map(Number).sort((a, b) => a - b),
    },
  };
}
