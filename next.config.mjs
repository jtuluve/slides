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
        source: "/slides/:id/assets/:path*",
        destination: "/_slidev/:id/assets/:path*",
      },
      {
        source: "/slides/:id",
        destination: "/_slidev/:id/index.html",
      },
      {
        source: "/slides/:id/:path*",
        destination: "/_slidev/:id/index.html",
      },
    ];
  },
};

export default nextConfig;
