/**
 * ESLint config shared between projects
 */
module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin', 'ban', 'import'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@angular-eslint/ng-cli-compat',
    'plugin:@angular-eslint/ng-cli-compat--formatting-add-on',
    'eslint-config-prettier',
    'eslint-config-prettier/@typescript-eslint',
  ],
  rules: {
    // disable some recommended rules
    '@typescript-eslint/interface-name-prefix': 'off',
    'no-extra-parens': 'off',
    'no-shadow': 'off',
    'no-throw-literal': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    // enable rules
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-extra-parens': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/no-throw-literal': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    complexity: ['warn', 10],
    eqeqeq: 'warn',
    yoda: 'warn',
    'ban/ban': [
      'warn',
      { name: ['describe', 'only'], message: "don't focus tests" },
      { name: 'fdescribe', message: "don't focus tests" },
      { name: ['it', 'only'], message: "don't focus tests" },
      { name: 'fit', message: "don't focus tests" },
      { name: ['test', 'only'], message: "don't focus tests" },
      { name: 'ftest', message: "don't focus tests" },
    ],
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: 'bgpg/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'no-else-return': 'warn',
  },
};
