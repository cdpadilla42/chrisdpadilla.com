import { getAlbums, getAllPages, getAllPosts } from '../lib/api';
import { BASE_URL } from '../lib/constants';

function generateSiteMap(slugs) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--Manual URL's-->
     <url>
       <loc>${BASE_URL}</loc>
       <priority>1</priority>
       <changefreq>daily</changefreq>
     </url>
     ${slugs
       .map((slug) => {
         if (slug === 'blog') {
           return `
            <url>
              <loc>${`${BASE_URL}/${slug}`}</loc>
              <priority>0.9</priority>
              <changefreq>daily</changefreq>
            </url>
          `;
         } else if (slug === 'now' || slug === 'music') {
           return `
             <url>
               <loc>${`${BASE_URL}/${slug}`}</loc>
               <priority>0.9</priority>
               <changefreq>monthly</changefreq>
             </url>
           `;
         } else {
           return `
            <url>
              <loc>${`${BASE_URL}/${slug}`}</loc>
            </url>
          `;
         }
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const pages = getAllPages();
  const posts = getAllPosts(['slug']);
  const albums = getAlbums();
  const dynamicSlugs = [...albums, ...posts].map(
    (contentObj) => contentObj.slug
  );

  const slugs = [...pages, ...dynamicSlugs];

  // const request = await fetch(EXTERNAL_DATA_URL);
  // const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(slugs);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
