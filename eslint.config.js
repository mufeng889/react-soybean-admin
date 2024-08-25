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
      'react/jsx-pascal-case': [
        'warn',
        {
          allowAllCaps: false,
          ignore: ['/^icon-/']
        }
      ],
      'no-underscore-dangle': 'off'
    }
  }
);
