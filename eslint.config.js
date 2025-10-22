import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: [
      'dist',
      'node_modules',
      'build',
      'coverage',
      '*.config.js',
      '*.config.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      prettier: prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React Hooks Rules
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // TypeScript Rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // Import Rules
      'import/order': 'off', // Disabled for now - too opinionated
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'off', // TypeScript handles this
      'import/named': 'off', // TypeScript handles this
      'import/namespace': 'off', // TypeScript handles this
      'import/default': 'off', // TypeScript handles this
      'import/no-named-as-default-member': 'off', // TypeScript handles this

      // Code Quality Rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'warn',
      'no-var': 'error',
      'prefer-const': 'warn',
      'prefer-template': 'warn',
      'object-shorthand': 'warn',
      'prefer-arrow-callback': 'warn',
      'no-nested-ternary': 'off', // Disabled - sometimes necessary
      'no-unneeded-ternary': 'warn',
      complexity: 'off', // Disabled - too strict
      'max-depth': ['warn', 4],
      'max-lines-per-function': 'off', // Disabled - too strict

      // Prettier Integration
      'prettier/prettier': [
        'warn',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'es5',
          tabWidth: 2,
          printWidth: 80,
          arrowParens: 'avoid',
          endOfLine: 'lf',
        },
      ],
    },
  },
]
