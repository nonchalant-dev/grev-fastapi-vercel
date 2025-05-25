/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // <--- enable static export mode
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig;
