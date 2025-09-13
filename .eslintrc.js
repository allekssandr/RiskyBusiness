module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: ['./tsconfig.json', './mobile/tsconfig.json', './server/tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
  ],
  rules: {
    // TypeScript specific
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    
    // React specific
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    
    // General
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-console': 'warn',
    'max-len': ['error', { code: 100, ignoreUrls: true }],
  },
  overrides: [
    {
      files: ['mobile/**/*'],
      env: {
        'react-native/react-native': true,
      },
      extends: [
        'plugin:react-native/all',
      ],
      plugins: [
        'react-native',
      ],
    },
    {
      files: ['server/**/*'],
      env: {
        node: true,
      },
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    '.expo/',
    'coverage/',
  ],
};
