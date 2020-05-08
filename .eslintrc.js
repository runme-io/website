module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'standard',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
    }
  ],
  plugins: [
    'svelte3',
    // 'prettier',
  ],
  rules: {
    // 'prettier/prettier': 'error',
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
  },
  settings: {
    'svelte3/ignore-styles': () => true
  }
}
