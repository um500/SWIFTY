/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com", // existing
      "cdn.sanity.io",       // ✅ ADD THIS (VERY IMPORTANT)
    ],
  },
};

module.exports = nextConfig;