/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Registry item photos are supplied as arbitrary URLs by the couple,
    // so allow images from any host. (No image uploads in this template.)
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
