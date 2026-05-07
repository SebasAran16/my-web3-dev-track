/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 480, 640, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 64, 96, 128, 192, 256, 384],
  },
  compiler: {
    removeConsole: { exclude: ["error", "warn"] },
  },
};

module.exports = nextConfig;
