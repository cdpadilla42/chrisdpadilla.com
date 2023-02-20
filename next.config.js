module.exports = {
  images: {
    domains: ['padilla-media.s3.amazonaws.com', 'res.cloudinary.com'],
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};
