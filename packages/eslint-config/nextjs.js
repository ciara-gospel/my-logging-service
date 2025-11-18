/* eslint-disable import/order */
import baseConfig from './base.js'
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'
import pluginNext from '@next/eslint-plugin-next'
import pluginA11y from 'eslint-plugin-jsx-a11y'

/**
 * ESLint configuration for Next.js applications (your web).
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@next/next': pluginNext,
      'jsx-a11y': pluginA11y,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,

      'jsx-a11y/alt-text': 'warn',
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },

  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
]
