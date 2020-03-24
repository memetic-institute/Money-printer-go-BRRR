const withPlugins = require('next-compose-plugins');
const withCss = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withOptimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

const plugins = [withCss, withFonts, withOptimizedImages, withBundleAnalyzer];

const nextConfig = {
    // next-optimized-images
    optimizeImagesInDev: true,
    responsive: {
        adapter: require('responsive-loader/sharp')
    },
    defaultImageLoader: 'responsive-loader',
    webpack(config /* options */) {
        return config;
    }
};

module.exports = withPlugins(plugins, nextConfig);
