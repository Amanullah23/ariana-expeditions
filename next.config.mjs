/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "dzndefhoezgbsblxzamo.supabase.co" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/",
        permanent: false,
      },
      {
        source: "/blog/:path*",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
