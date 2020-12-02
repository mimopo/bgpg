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
  rules: common.rules,
};
