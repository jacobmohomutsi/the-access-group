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
      {
        protocol: "https",
        hostname: "dnqhdlykkvvjdolrytym.supabase.co",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
