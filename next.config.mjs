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
        source: "/slides/:id/:path*.:ext(png|jpg|jpeg|gif|svg|ico|css|js|woff2|ttf|webp)",
        destination: "/_slidev/:id/:path*.:ext",
      },
      {
        source: "/:file(.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp))",
        destination: "/_slidev/token-efficient-mcp/:file",
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
