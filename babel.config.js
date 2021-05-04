module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@api': './src/api',
            '@assets': './assets',
            '@components': './src/components',
            '@constants': './src/constants',
            '@containers': './src/containers',
            '@env': './environment.js',
            '@i18n': './src/i18n',
            '@navigation': './src/navigation',
            '@reducers': './src/reducers',
            '@sagas': './src/sagas',
            '@store': './src/store',
            '@theme': './src/theme',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};
