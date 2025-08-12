module.exports = {
  env: { browser: true, es2022: true, jest: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:jest/recommended',
    'prettier'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
  }
};
