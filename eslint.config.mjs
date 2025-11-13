// Imports
import baseConfig from './packages/eslint-config/base.js';
import nestjsConfig from './packages/eslint-config/nest.js';
import reactInternalConfig from './packages/eslint-config/react-internal.js';
import nextJsConfig from './packages/eslint-config/nextjs.js';

const allConfigs = [];

if (Array.isArray(baseConfig)) {
  allConfigs.push(...baseConfig);
} else {
  allConfigs.push(baseConfig);
}

allConfigs.push({
  settings: {
    'import/resolver': {
      typescript: {
        project: [
          'tsconfig.base.json',
          'tsconfig.json',
          'apps/*/tsconfig.json',
          'packages/*/tsconfig.json',
        ],
      },
    },
  },
});

if (Array.isArray(nestjsConfig)) {
  allConfigs.push(...nestjsConfig);
} else {
  allConfigs.push(nestjsConfig);
}

if (Array.isArray(nextJsConfig)) {
  allConfigs.push(...nextJsConfig);
} else {
  allConfigs.push(nextJsConfig);
}

if (Array.isArray(reactInternalConfig)) {
  allConfigs.push(...reactInternalConfig);
} else {
  allConfigs.push(reactInternalConfig);
}

allConfigs.push({
  files: ['eslint.config.js', 'packages/eslint-config/*.js'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
  },
});

export default allConfigs;