module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  globals: {
    __DEV__: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  rules: {
    camelcase: ['off'],
    'no-nested-ternary': ['off'],
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/forbid-prop-types': ['off'],
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'enforce',
        custom: 'ignore',
        exceptions: [],
      },
    ],
  },
};
