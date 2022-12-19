module.exports = function (api) {
  api.cache(true);

  const isProd = process.env.NODE_ENV === 'production';

  const presets = [
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            browsers: ['>0.25%', 'not dead', 'Explorer 11'],
          },
          useBuiltIns: 'entry',
          corejs: 3,
        },
      },
    ],
  ];

  const plugins = [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-template-literals',
  ];

  return {
    presets,
    plugins,
  };
};
