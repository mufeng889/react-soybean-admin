import { defineConfig } from '@soybeanjs/eslint-config';

export default defineConfig(
  {
    react: true,
    unocss: true,
    prettierRules: {
      singleAttributePerLine: true,
      trailingCommas: 'none'
    },
    ignores: ['src/layouts/modules/global-tab/index.tsx']
  },
  {
    rules: {
      'no-underscore-dangle': 'off',
      'react/jsx-no-undef': [true, { allowGlobals: true }]
    }
  }
);
