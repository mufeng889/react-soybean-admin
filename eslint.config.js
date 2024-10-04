import { defineConfig } from '@soybeanjs/eslint-config';

export default defineConfig(
  {
    react: true,
    unocss: true,
    prettierRules: {
      singleAttributePerLine: true,
      trailingCommas: 'none'
    },
    ignores: ['ErrorBoundary.tsx', 'src/layouts/base-layout/MenuUtil.tsx']
  },
  {
    rules: {
      'no-underscore-dangle': 'off',
      'react/jsx-no-undef': 'off'
    }
  }
);
