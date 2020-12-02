const common = require('../eslint-config');

module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*', '.eslintrc.js'],
  overrides: [
    /**
     * TYPESCRIPT FILES
     */
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
      },
      plugins: common.plugins,
      extends: [...common.extends, 'plugin:@angular-eslint/template/process-inline-templates'],
      rules: {
        ...common.rules,
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
      },
    },
    /**
     * COMPONENT TEMPLATES
     */
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {},
    },
  ],
};
