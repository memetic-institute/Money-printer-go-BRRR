const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const plugins = [withBundleAnalyzer];

const nextConfig = {
    webpack(config /* options */) {
        return config;
    },
};

module.exports = withPlugins(plugins, nextConfig);
