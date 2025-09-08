import {dirname} from 'path';
import path from 'node:path';
import {fileURLToPath} from 'url';
import {FlatCompat} from '@eslint/eslintrc';
import securityPlugin from 'eslint-plugin-security';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import reactHooks from 'eslint-plugin-react-hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Use the `ignores` key to specify files to ignore
  {
    ignores: [
      '.next/', // Ignore Next.js build files
      'node_modules/', // Ignore node_modules
      'dist/', // Ignore distribution files
      'coverage/', // Ignore coverage reports
      'build/', // Ignore build output
      'out/', // Ignore output folder
      '**/*.min.js', // Ignore minified JS files
      '**/*.d.ts', // Ignore TypeScript declaration files
      '**/*.snap', // Ignore snapshot test files
      '**/*.config.js', // Ignore config files
      '**/*.config.mjs', // Ignore config files
      'eslint.config.mjs', // Ignore ESLint config itself
    ],
  },

  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      '**/node_modules/**',
      'dist/**',
      'coverage/**',
      'build/**',
      '**/*.min.js',
      '**/*.d.ts',
      '**/*.snap',
      '**/*.config.js',
      '**/*.config.mjs',
      'eslint.config.mjs',
      '.next/**/*',
      'out/**/*',
      'build/**/*',
    ],
    plugins: {
      security: securityPlugin,
    },
    rules: {
      ...(securityPlugin?.configs?.recommended?.rules ?? {}),
    },
  },

  // JS-only rules
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier,
      '@next/next': nextPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...(nextPlugin.configs['core-web-vitals']?.rules ?? {}),
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-sync-scripts': 'off',
    },
  },

  // TypeScript + Next.js rules
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        project: path.join(__dirname, 'tsconfig.json'),
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['**/*.ts?(x)'],
    plugins: {
      '@next/next': nextPlugin,
      prettier,
      '@typescript-eslint': tseslint.plugin,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      'react-hooks': reactHooks,
    },
    rules: {
      ...(nextPlugin.configs['core-web-vitals']?.rules ?? {}),
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];

export default eslintConfig;
