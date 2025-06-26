module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['react-app', 'airbnb', 'plugin:prettier/recommended'],
  plugins: ['react', 'prettier'],
  rules: {
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'draft'],
      },
    ],
    'prettier/prettier': ['error', { singleQuote: true }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
