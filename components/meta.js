import Head from 'next/head';
import { HOME_OG_IMAGE_URL } from '../lib/constants';

export default function Meta({ customOGImage, title }) {
  const ogImage = customOGImage || HOME_OG_IMAGE_URL;
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
      <link rel="alternate" type="application/rss+xml" href="/api/feed" />
      <meta
        name="description"
        content={`Web developer, musician, human being.`}
      />
      <meta
        prefix="og: http://ogp.me/ns#"
        name="image"
        property="og:image"
        content={ogImage}
      />
      <meta name="image" property="og:image" content={ogImage} />
      <meta
        prefix="og: http://ogp.me/ns#"
        property="og:image:secure_url"
        content={ogImage}
      />
      <meta
        prefix="og: http://ogp.me/ns#"
        property="og:image:url"
        content={ogImage}
      />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={title || 'Chris Padilla'} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:site" content="@letsgokris" />
      {/* <meta property="twitter:description" content="Chris Padilla" /> */}
    </Head>
  );
}
