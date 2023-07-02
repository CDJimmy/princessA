/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

require('dotenv').config()

module.exports = {
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    IMAGES_DOMAIN: process.env.NEXT_PUBLIC_IMAGES_DOMAIN
  },

  images: {
    deviceSizes: [640, 768, 1027, 1280, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128],
    domains: [process.env.IMAGES_DOMAIN],
    path: '/_next/image',
    loader: 'default',
  }
}

module.exports = nextConfig
