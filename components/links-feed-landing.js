import Link from 'next/link';
import TagsNav from './TagsNav';
import { LinksFeed } from '../pages/links';

export default function LinksFeedLanding() {
  return (
    <section>
      <div className="heading_flex">
        <h2>Links & Snippets</h2>
        <Link href="/links">
          <a>
            <h2>See All</h2>
          </a>
        </Link>
      </div>
      <p>Curated links from the world wide web.</p>
      <hr />
      <LinksFeed limit={5} />
    </section>
  );
}
