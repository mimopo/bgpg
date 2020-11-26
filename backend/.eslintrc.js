module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    'no-else-return': ['warn'],
    'no-extra-parens': ['warn'],
    'no-shadow': ['warn'],
    'no-throw-literal': ['warn'],
    'no-unused-expressions': ['warn'],
    'no-use-before-define': ['warn'],
    'sort-imports': ['warn', { allowSeparatedGroups: true }],
    camelcase: ['warn'],
    complexity: ['warn', 10],
    eqeqeq: ['warn'],
    yoda: ['warn'],
  },
};
