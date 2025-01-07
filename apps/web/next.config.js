/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aceternity.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        pathname: "/demos/**",
      },
    ],
  },
};
