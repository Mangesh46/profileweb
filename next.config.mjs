const nextConfig = {
  output: 'export',

  basePath: process.env.NODE_ENV === 'production' ? '/profileweb' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/profileweb/' : '',

  trailingSlash: true,

  images: {
    unoptimized: true,
  },
}

export default nextConfig
