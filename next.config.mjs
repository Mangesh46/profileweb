/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed: output: 'export' — Vercel handles this natively, no static export needed
  // Removed: basePath/assetPrefix — Vercel deploys at root domain automatically
  // Removed: trailingSlash — not needed on Vercel

  images: {
    unoptimized: true, // keep this until you add real images
  },
}

export default nextConfig
