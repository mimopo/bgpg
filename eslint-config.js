module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@angular-eslint/ng-cli-compat',
    'plugin:@angular-eslint/ng-cli-compat--formatting-add-on',
    'eslint-config-prettier',
    'eslint-config-prettier/@typescript-eslint',
    // 'plugin:jsdoc/recommended',
    // 'plugin:import/errors',
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
    // 'import/order': 'error',
    // 'import/no-unresolved': 'error',
    'import/order': ['error', { 'newlines-between': 'always' }],
    'no-else-return': 'warn',
    complexity: ['warn', 10],
    eqeqeq: 'warn',
    yoda: 'warn',
  },
  // overrides: [
  //   {
  //     files: ['backend/**/*.ts'],
  //     parserOptions: {
  //       project: __dirname + '/backend/tsconfig.json',
  //       sourceType: 'module',
  //     },
  //     env: {
  //       node: true,
  //       jest: true,
  //     },
  //   },
  //   // {
  //   //   files: ['frontend/**/*.ts'],
  //   //   parserOptions: {
  //   //     project: ['frontend/tsconfig.json', 'frontend/e2e/tsconfig.json'],
  //   //     createDefaultProgram: true,
  //   //   },
  //   //   extends: ['plugin:@angular-eslint/template/process-inline-templates'],
  //   //   rules: {
  //   //     '@angular-eslint/component-selector': [
  //   //       'error',
  //   //       {
  //   //         type: 'element',
  //   //         prefix: 'app',
  //   //         style: 'kebab-case',
  //   //       },
  //   //     ],
  //   //     '@angular-eslint/directive-selector': [
  //   //       'error',
  //   //       {
  //   //         type: 'attribute',
  //   //         prefix: 'app',
  //   //         style: 'camelCase',
  //   //       },
  //   //     ],
  //   //   },
  //   // },
  //   // {
  //   //   files: ['frontend/**/*.html'],
  //   //   extends: ['plugin:@angular-eslint/template/recommended'],
  //   // },
  // ],
};
