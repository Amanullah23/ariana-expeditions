/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "dzndefhoezgbsblxzamo.supabase.co" },
    ],
  },
  // Skips the memory-heavy type-check pass during `next build`. Code should
  // still be checked locally during development — this only affects the
  // production build step.
  typescript: {
    ignoreBuildErrors: true,
  },
  // Turbopack's production bundler mangles the import for native/CJS
  // packages like `pg`, producing an unresolvable module name at runtime
  // (e.g. "pg-587764f78a6c7a9c"). Marking it external makes Next.js require()
  // it directly at runtime instead of trying to bundle it.
  serverExternalPackages: ["pg"],
  // Momtaz's shared hosting refuses additional process spawns beyond a low
  // limit (CloudLinux LVE). Next.js normally parallelizes the "collecting
  // page data" step across several worker processes — force it down to one
  // to avoid the resulting EAGAIN crash.
  experimental: {
    cpus: 1,
    workerThreads: false,
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
