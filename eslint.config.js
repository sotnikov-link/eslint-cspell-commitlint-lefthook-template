/* eslint-disable perfectionist/sort-objects */
// @ts-nocheck

// eslint-disable-next-line import/no-unassigned-import
import 'eslint-plugin-only-warn';
import markdown from '@eslint/markdown';
import auto from 'eslint-config-canonical/auto';
import { recommended as canonical } from 'eslint-config-canonical/canonical';
import { recommended as json } from 'eslint-config-canonical/json';
import { recommended as node } from 'eslint-config-canonical/node';
import { recommended as prettier } from 'eslint-config-canonical/prettier';
import { recommended as react } from 'eslint-config-canonical/react';
import { recommended as typescript } from 'eslint-config-canonical/typescript';
import { recommended as yaml } from 'eslint-config-canonical/yaml';
import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tsLint from 'typescript-eslint';
import jsdocRules from './eslint/jsdoc/jsdoc-rules.cjs';
import reactRules from './eslint/react/rules.cjs';

/**
 * @type {import('eslint').Linter.RulesRecord}
 */
const sortRules = {};

for (const rule of ['perfectionist/sort-objects']) {
  sortRules[rule] = [
    'warn',

    /**
     * @see https://github.com/azat-io/eslint-plugin-perfectionist/blob/bcc180ad76fc9f09b58511409cf0ce4d63d486dc/index.ts#L64C11-L64C22
     */
    {
      type: 'line-length',
      order: 'asc',
    },
  ];
}

/**
 * @type {import('typescript-eslint').FlatConfig}
 */
const config = tsLint.config(
  {
    ignores: [
      '.yarn/**',
      'yarn.lock',
      '**/node_modules/**',
      'packages/*/dist/**',
      'packages/*/out/**',
      'tests/fixtures/**',
      'tests/fixtures-temp-*/**',
      'coverage/**',
      '_ignored/**',
    ],
  },

  auto,

  jsdocRules,

  reactRules,

  mergeConfigs(...node, {
    rules: {
      'import/no-default-export': 'warn',
    },
  }),

  mergeConfigs(
    ...canonical,

    {
      rules: {
        ...sortRules,
        'canonical/sort-keys': 'off',
        'unicorn/filename-case': 'warn',
        // 'canonical/filename-match-exported': ['warn', { transforms: 'kebab' }],
        'canonical/filename-match-exported': 'off',
        'canonical/filename-match-regex': 'off',
      },
    },

    {
      rules: {
        '@stylistic/jsx-newline': ['warn', { prevent: true }],

        // Disable rules that conflict with prettier
        '@stylistic/object-curly-spacing': 'off',
        '@stylistic/type-annotation-spacing': 'error',

        // Replace custom empty-lines rules with @stylistic equivalents
        '@stylistic/lines-between-class-members': ['warn', 'always'],

        '@stylistic/padding-line-between-statements': [
          'warn',

          // Separated Import Group
          { blankLine: 'always', prev: '*', next: 'import' },
          { blankLine: 'always', prev: 'import', next: '*' },
          { blankLine: 'never', prev: 'import', next: 'import' },

          // Separated Export Group
          { blankLine: 'always', prev: '*', next: 'export' },
          { blankLine: 'always', prev: 'export', next: '*' },
          { blankLine: 'any', prev: 'export', next: 'export' },

          // Separated Singleline Variable Group
          { blankLine: 'always', prev: '*', next: 'singleline-var' },
          { blankLine: 'always', prev: 'singleline-var', next: '*' },
          { blankLine: 'any', prev: 'singleline-var', next: 'singleline-var' },
          { blankLine: 'always', prev: '*', next: 'singleline-let' },
          { blankLine: 'always', prev: 'singleline-let', next: '*' },
          { blankLine: 'any', prev: 'singleline-let', next: 'singleline-let' },
          { blankLine: 'always', prev: '*', next: 'singleline-const' },
          { blankLine: 'always', prev: 'singleline-const', next: '*' },
          {
            blankLine: 'any',
            prev: 'singleline-const',
            next: 'singleline-const',
          },

          // Always Before
          {
            blankLine: 'always',
            prev: '*',
            next: [
              'break',
              'throw',
              'return',
              'directive',
              'multiline-expression',
              // 'multiline-block-like', // enough block-like?

              // equals to 'try', 'class', 'switch', 'function'
              'block-like',

              // switch-case
              'case',
              'default',

              // multiline variable group
              'multiline-var',
              'multiline-let',
              'multiline-const',

              // typescript
              'type',
              'interface',
            ],
          },

          // Always After
          {
            blankLine: 'always',
            prev: [
              'directive',
              'block-like',
              'multiline-var',
              'multiline-let',
              'multiline-const',
              'multiline-expression',
              // 'multiline-block-like', // enough block-like?

              // typescript
              'type',
              'interface',
            ],
            next: '*',
          },

          // https://github.com/gajus/eslint-config-canonical/blob/9553ce3c70d0ca51758af6b764f9f38932c1db7b/configurations/typescript-compatibility.js#L86
          {
            blankLine: 'always',
            next: '*',
            prev: 'multiline-block-like',
          },
        ],
      },
    },
  ),

  mergeConfigs(...typescript, {
    plugins: {
      'unused-imports': unusedImports,
    },

    rules: {
      //

      /**
       * Unsupported rule but included in canonical/typescript
       * @see https://github.com/gajus/eslint-config-canonical/blob/v45.0.0/configurations/typescript-compatibility.ts#L7
       * @see https://github.com/typescript-eslint/typescript-eslint/issues/8072
       * @see https://github.com/typescript-eslint/typescript-eslint/issues/8074
       */
      '@typescript-eslint/indent': 'off',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  }),

  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'perfectionist/sort-imports': 'off', // from canonical
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          // The default grouping, but with no blank lines.
          // https://github.com/lydell/eslint-plugin-simple-import-sort/blob/24befb6cd5d7701a87eb2b655e3f0de8115441b9/examples/.eslintrc.js#L99
          groups: [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.']],
        },
      ],
    },
  },

  mergeConfigs(...react, {
    plugins: {
      'react-refresh': reactRefresh,
    },

    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'react/display-name': 'warn', // for easy debugging
      'react/jsx-sort-props': 'off',
      'react/jsx-sort-default-props': 'off',
      'react/sort-default-props': 'off',
      'react/jsx-handler-names': 'off',
      'react/forbid-component-props': 'off',
    },
  }),

  // markdown.configs.recommended, // Not working with our ts-rules

  // // Unified Markdown configuration with processor and code block rules
  // mergeConfigs({
  //   files: ['**/*.md'],
  //   plugins: {
  //     markdown,
  //   },
  //   // cspell:ignore commonmark
  //   language: 'markdown/commonmark',
  //   languageOptions: {
  //     frontmatter: false,
  //   },
  //   rules: {
  //     'unicorn/filename-case': 'off', // README.md is a standard filename
  //   },
  // }),

  // Markdown processor configuration for code blocks
  {
    files: ['**/*.md'],
    plugins: {
      markdown,
    },
    language: 'markdown/commonmark',
    processor: 'markdown/markdown',
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2_020,
        sourceType: 'module',
      },
    },
  },

  // Unified rules for JavaScript and TypeScript code blocks in Markdown
  {
    files: ['**/*.md/*.js', '**/*.md/*.ts', '**/*.md/*.tsx', '**/*.md/*.jsx'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2_020,
      parserOptions: {
        project: null, // Disable TypeScript project checking for Markdown code blocks
      },
    },
    // rules: {
    //   'no-var': 'warn',
    //   'no-unused-vars': 'warn',
    //   'prefer-const': 'warn',
    // },
  },

  // Special configuration for README.md to disable filename case rule
  {
    files: ['**/*.md', '**/*.md/*'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },

  // Prettier needs last position in the config

  mergeConfigs(eslintPluginPrettierRecommended, ...prettier, {
    rules: {
      'prettier/prettier': [
        'warn',
        {},
        {
          usePrettierrc: true,
        },
      ],
    },
  }),

  mergeConfigs(...json, eslintPluginPrettierRecommended, {
    rules: {
      'jsonc/no-comments': 'off',
      'jsonc/sort-keys': 'off',
      'jsonc/object-curly-spacing': 'off',
      'jsonc/array-element-newline': 'off',
      'jsonc/array-bracket-newline': 'off',
      'jsonc/object-curly-newline': 'off',
    },
  }),

  mergeConfigs(...yaml, eslintPluginPrettierRecommended, {
    files: ['**/*.yml', '**/*.yaml'],
    rules: {
      'spaced-comment': 'off',
      'yml/sort-keys': 'off',
      'yml/no-multiple-empty-lines': 'off', // enough prettier
    },
  }),
);

export default config;
