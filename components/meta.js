import Head from 'next/head';
import { HOME_OG_IMAGE_URL } from '../lib/constants';
import OGImage from './OGImage';

export default function Meta({ customOGImage }) {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicons/favicon-16x16.png" />
      <link rel="shortcut icon" href="/favicons/favicon-16x16.png" />
      <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
      <meta
        name="description"
        content={`Web developer, musician, human being.`}
      />
      <OGImage image={customOGImage || HOME_OG_IMAGE_URL} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content="Chris Padilla" />
      {/* <meta property="twitter:description" content="Chris Padilla" /> */}
      <meta property="twitter:site" content="@letsgokris" />
    </Head>
  );
}
