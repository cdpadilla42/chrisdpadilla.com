import React from 'react';

const OGImage = (ogImage) => {
  return (
    <>
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:url" content={ogImage} />
      <meta property="og:image:url" content={ogImage} />
      <meta property="twitter:image" content={ogImage} />
    </>
  );
};

export default OGImage;
