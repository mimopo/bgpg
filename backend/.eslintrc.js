const common = require('../eslint-config');

module.exports = {
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['.eslintrc.js'],
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  plugins: common.plugins,
  extends: common.extends,
  rules: {
    ...common.rules,
    'no-restricted-imports': [
      'error',
      {
        importNames: ['ObjectID'],
        name: 'mongodb',
        message: 'ObjectID (with capital "D") is deprecated. Use ObjectId (lowercase "d") instead',
      },
      {
        importNames: ['ObjectID'],
        name: 'typeorm',
        message: 'Use ObjectId from mongodb instead',
      },
    ],
  },
};
