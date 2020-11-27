/**
 * RULES REFERENCE:
 * eslint: https://eslint.org/docs/rules/
 * typescript-eslint: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
 * eslint-config-prettier: https://github.com/prettier/eslint-config-prettier
 */
module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
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
    'import/order': 'error',
    'no-else-return': 'warn',
    complexity: ['warn', 10],
    eqeqeq: 'warn',
    yoda: 'warn',
  },
};
