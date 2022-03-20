const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextPlugins = [withBundleAnalyzer, withPWA];

const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  pwa: {
    dest: 'public',
  },
};

module.exports = withPlugins(nextPlugins, nextConfig);
