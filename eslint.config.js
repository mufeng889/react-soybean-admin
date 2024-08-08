import { defineConfig } from '@soybeanjs/eslint-config';

export default defineConfig(
  {
    react: true,
    unocss: true,
    prettierRules: {
      singleAttributePerLine: true,
      trailingCommas: 'none'
    }
  },
  {
    rules: {
      'react/jsx-pascal-case': [
        'warn',
        {
          allowAllCaps: false,
          ignore: ['/^icon-/']
        }
      ]
    }
  }
);
