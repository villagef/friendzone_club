/** @type {import('next').NextConfig} */

const withNextIntl = require("next-intl/plugin")()

const nextConfig = {
  transpilePackages: ["lucide-react"],
  reactStrictMode: false,
}

module.exports = withNextIntl(nextConfig)
