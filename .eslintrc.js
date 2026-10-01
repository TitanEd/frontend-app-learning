// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@openedx/frontend-build');

const config = createConfig('eslint', {
  rules: {
    // TODO: all these rules should be renabled/addressed. temporarily turned off to unblock a release.
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-restricted-exports': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/no-unknown-property': 'off',
    'func-names': 'off',
    'linebreak-style': ['error', 'unix'],
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-nested-ternary': 'off',
    'no-useless-escape': 'off',
    'react/no-array-index-key': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'no-console': 'off',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.prod.config.js',
      },
    },
  },
});

module.exports = config;
