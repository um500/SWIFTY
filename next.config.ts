const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // 🔥 IMPORTANT (sanity images)
      },
    ],
  },
};

export default nextConfig;