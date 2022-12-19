module.exports = {
  experimental: { scss: true },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    CHECKOUT_PK: process.env.CHECKOUT_PK,
    SENTRY_DNS: process.env.SENTRY_DNS,
  },
  env: {
    API_URL: process.env.API_URL,
    CHECKOUT_PK: process.env.CHECKOUT_PK,
    SENTRY_DNS: process.env.SENTRY_DNS,
  },
  images: {
    domains: ['files.unknown.me'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
