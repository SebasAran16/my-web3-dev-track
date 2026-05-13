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
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|ttf|eot)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(fonts|languagesAndTools|icons|teachers|projects|experience|backgrounds)/:all*",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
