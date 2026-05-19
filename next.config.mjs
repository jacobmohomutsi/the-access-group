/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.theaccessgroup.co.za",
      },
      {
        protocol: "https",
        hostname: "anewhotels.com",
      },
    ],
  },
};

export default nextConfig;
