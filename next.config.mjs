/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/slides/:id",
        destination: "/_slidev/:id/index.html",
      },
      {
        source: "/slides/:id/:path*",
        destination: "/_slidev/:id/:path*",
      },
    ];
  },
};

export default nextConfig;
