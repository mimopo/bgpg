/**
 * RULES REFERENCE:
 * eslint: https://eslint.org/docs/rules/
 * typescript-eslint: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
 * eslint-config-prettier: https://github.com/prettier/eslint-config-prettier
 */
module.exports = {
  extends: [
    process.cwd() + '/node_modules/eslint-config-prettier',
    process.cwd() + '/node_modules/eslint-config-prettier/@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-extra-parens': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/no-throw-literal': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
    '@typescript-eslint/no-use-before-define': 'warn',
    'import/order': 'error',
    'no-else-return': 'warn',
    camelcase: 'warn',
    complexity: ['warn', 10],
    eqeqeq: 'warn',
    yoda: 'warn',
  },
};
