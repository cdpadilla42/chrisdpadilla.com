import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../layout';

const isInternalUrl = (url) => url.startsWith('/');
const shouldOpenInNewTab = (url) =>
  /^https?:\/\//.test(url) || url === '/amethyst-zone';

export default function LinkTreePage({ linkTree }) {
  const renderIcon = (icon) => {
    if (!icon?.emoji) return null;

    return (
      <span className="link-tree-item__icon" aria-hidden="true">
        {icon.emoji}
      </span>
    );
  };

  return (
    <Layout noFooter>
      <div className="link-tree-page">
        <header className="link-tree-page__profile">
          <div className="link-tree-page__avatar">
            <Link href={linkTree.profile.homeUrl}>
              <a aria-label={linkTree.profile.avatarAlt}>
                <Image
                  src={linkTree.profile.avatarSrc}
                  alt={linkTree.profile.avatarAlt}
                  width={88}
                  height={88}
                />
              </a>
            </Link>
          </div>
          <h1>
            <Link href={linkTree.profile.homeUrl}>
              <a>{linkTree.profile.name}</a>
            </Link>
          </h1>
          <p className="link-tree-page__bio">
            <span className="link-tree-page__bio-emoji">
              {linkTree.profile.bioEmoji}
            </span>
            <span>{linkTree.profile.bio}</span>
            <span className="link-tree-page__bio-art">{linkTree.profile.bioArt}</span>
          </p>
        </header>

        <div className="link-tree-page__groups">
          {linkTree.groups
            .filter((group) => group.links.length > 0)
            .map((group) => (
              <section key={group.id} className="link-tree-page__group">
                <h2>{group.title}</h2>
                <div className="link-tree-page__items">
                  {group.links.map((link) => {
                    const content = (
                      <>
                        <span className="link-tree-item__lead">
                          {renderIcon(link.icon)}
                          <span className="link-tree-item__text">
                            <span className="link-tree-item__title">
                              {link.title}
                            </span>
                            {link.description ? (
                              <span className="link-tree-item__description">
                                {link.description}
                              </span>
                            ) : null}
                          </span>
                        </span>
                        <span className="link-tree-item__arrow" aria-hidden="true">
                          ↗
                        </span>
                      </>
                    );

                    if (isInternalUrl(link.url)) {
                      return (
                        <Link key={`${group.id}-${link.title}`} href={link.url}>
                          <a
                            className="link-tree-item"
                            data-highlight={link.highlight ? 'true' : 'false'}
                            target={shouldOpenInNewTab(link.url) ? '_blank' : undefined}
                            rel={
                              shouldOpenInNewTab(link.url)
                                ? 'noopener noreferrer'
                                : undefined
                            }
                          >
                            {content}
                          </a>
                        </Link>
                      );
                    }

                    return (
                      <a
                        key={`${group.id}-${link.title}`}
                        className="link-tree-item"
                        data-highlight={link.highlight ? 'true' : 'false'}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {content}
                      </a>
                    );
                  })}
                </div>
              </section>
            ))}
        </div>
      </div>

      <style jsx>{`
        .link-tree-page {
          min-height: 100vh;
          padding: 1.5rem 1rem 3rem;
          background:
            radial-gradient(
              circle at top,
              rgba(255, 230, 109, 0.14),
              transparent 30%
            ),
            linear-gradient(180deg, #292f36 0%, #1f242b 100%);
        }

        .link-tree-page__profile {
          max-width: 32rem;
          margin: 0 auto;
        }

        .link-tree-page__profile {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .link-tree-page__avatar {
          width: 5.5rem;
          height: 5.5rem;
          overflow: hidden;
          border-radius: 999px;
          border: 2px solid rgba(255, 230, 109, 0.25);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);
        }

        .link-tree-page__avatar :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 0 25%;
        }

        .link-tree-page__bio {
          display: grid;
          gap: 0.35rem;
        }

        .link-tree-page__bio-emoji {
          display: block;
          line-height: 1;
        }

        .link-tree-page__bio-art {
          display: block;
        }

        .link-tree-page__groups {
          display: grid;
          gap: 1.25rem;
          width: 100%;
          max-width: 32rem;
          margin: 0 auto;
        }

        .link-tree-page__group {
          width: 100%;
        }

        .link-tree-page__group h2 {
          margin-top: 0;
          margin-bottom: 0.6rem;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .link-tree-page__items {
          display: grid;
          gap: 0.8rem;
          width: 100%;
        }

        .link-tree-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          width: 100%;
          box-sizing: border-box;
          padding: 1rem 1.1rem;
          border-radius: 1.1rem;
          color: var(--white);
          background: rgba(0, 0, 0, 0.28);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .link-tree-item[data-highlight='true'] {
          background: linear-gradient(
            90deg,
            rgba(255, 230, 109, 0.16),
            rgba(78, 205, 196, 0.14)
          );
          border-color: rgba(255, 230, 109, 0.35);
        }

        .link-tree-item__lead {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          min-width: 0;
        }

        .link-tree-item__icon {
          flex: 0 0 auto;
          font-size: 1.35rem;
          line-height: 1;
        }

        .link-tree-item__text {
          display: grid;
          gap: 0.2rem;
        }

        .link-tree-item__title {
          color: var(--white);
          font-weight: 700;
        }

        .link-tree-item__description {
          color: var(--code-font-color);
          font-size: 0.92rem;
          line-height: 1.35;
        }

        .link-tree-item__arrow {
          color: var(--yellow);
          font-size: 1.1rem;
        }

        @media (max-width: 600px) {
          .link-tree-page {
            padding-top: 1rem;
          }

          .link-tree-page__profile {
            gap: 0.5rem;
            margin-bottom: 0.75rem;
          }

          .link-tree-page__avatar {
            width: 4.75rem;
            height: 4.75rem;
          }

          .link-tree-page__profile h1 {
            margin: 0;
            line-height: 1.05;
          }

          .link-tree-page__bio {
            gap: 0.2rem;
          }
        }
      `}</style>
    </Layout>
  );
}
