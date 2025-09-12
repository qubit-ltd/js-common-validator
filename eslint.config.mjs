import qubitConfig from '@qubit-ltd/eslint-config';
import babelParser from '@babel/eslint-parser';

export default [
  ...qubitConfig,
  {
    files: ['src/**/*.js', 'test/**/*.js'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-transform-runtime',
            ['@babel/plugin-proposal-decorators', { version: '2023-11' }]
          ]
        }
      }
    }
  },
  {
    files: ['test/**/*.js'],
    rules: {
      'max-classes-per-file': 'off',  // ignore max-classes-per-file rule in test files
      'no-unused-vars': 'off',        // ignore no-unused-vars rule in test files
    },
  },
];
