import { defineConfig } from '@soybeanjs/eslint-config';
import sort from 'eslint-plugin-sort';

export default defineConfig(
  {
    ignores: ['ErrorBoundary.tsx'],
    prettierRules: {
      singleAttributePerLine: true,
      trailingCommas: 'none'
    },
    react: true,
    unocss: true
  },
  sort.configs['flat/recommended'],
  {
    rules: {
      'import/newline-after-import': 'error',
      'import/no-absolute-path': 'warn',
      'import/no-empty-named-blocks': ['error'],
      'import/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true
        }
      ],

      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc'
          },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          'newlines-between': 'always',
          pathGroups: [{ group: 'internal', pattern: '{{@,~}/,#}**' }],
          pathGroupsExcludedImportTypes: ['builtin']
        }
      ],

      'no-underscore-dangle': 'off',

      'react/hook-use-state': [
        'error', // or "warn" to only warn instead of error
        {
          allowDestructuredState: true
        }
      ],

      'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],
      'react/jsx-closing-tag-location': 'warn',
      'react/jsx-curly-brace-presence': [
        'warn',
        {
          children: 'never',
          propElementValues: 'always',
          props: 'never'
        }
      ],
      'react/jsx-curly-newline': ['warn', { multiline: 'consistent', singleline: 'consistent' }],
      'react/jsx-equals-spacing': ['warn', 'never'],
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/jsx-newline': 'warn',
      'react/jsx-no-undef': ['off'],
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-one-expression-per-line': [
        'warn',
        {
          allow: 'single-child'
        }
      ],
      'react/jsx-props-no-multi-spaces': 'warn',
      'react/jsx-sort-props': [
        'warn',
        { callbacksLast: true, ignoreCase: true, multiline: 'last', shorthandFirst: true }
      ],
      'react/prefer-read-only-props': ['error'],
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true
        }
      ],

      'react-refresh/only-export-components': ['warn', { allowExportNames: ['loader', 'action'] }],

      'sort/import-members': ['error', { caseSensitive: true, natural: true }],
      'sort/imports': ['off'],
      'sort/string-enums': ['error', { caseSensitive: false, natural: true }],
      'sort/string-unions': ['error', { caseSensitive: false, natural: true }],
      'sort/type-properties': ['warn', { caseSensitive: false, natural: true }],
      'sort/type-properties': ['error', { caseSensitive: false, natural: true }]
    }
  }
);
