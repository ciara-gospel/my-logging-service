import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'
import onlyWarn from 'eslint-plugin-only-warn'
import importPlugin from 'eslint-plugin-import'

/**
 * @type {import("eslint").Linter.Config[]}
 * */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,

  {
    plugins: {
      turbo: turboPlugin,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.base.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json'],
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      'import/prefer-default-export': 'off',
    },
  },

  {
    plugins: {
      onlyWarn,
    },
  },

  {
    languageOptions: {
      globals: {
        node: true,
      },
    },
  },

  {
    ignores: ['dist/**'],
  },
]
