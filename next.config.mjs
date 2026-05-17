/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.theaccessgroup.co.za",
      },
    ],
  },
};

export default nextConfig;
