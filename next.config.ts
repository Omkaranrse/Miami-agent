import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "movemiamirealtor.com",
      },
      {
        protocol: "https",
        hostname: "i1.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "i2.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "i3.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "dvvjkgh94f2v6.cloudfront.net",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/properties",
        destination: "/listings",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/team",
        destination: "/agents",
        permanent: true,
      },
      {
        source: "/updates",
        destination: "/updates-news",
        permanent: true,
      },
      {
        source: "/updates/:slug",
        destination: "/updates-news/:slug",
        permanent: true,
      },
      {
        source: "/home-sale-caculator",
        destination: "/calculators/home-sale-caculator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
