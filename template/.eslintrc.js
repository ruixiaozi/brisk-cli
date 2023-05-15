module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'project': './tsconfig.json',
  },
  'overrides': [
    {
      'files': ['*.ts'],
      'parser': '@typescript-eslint/parser',
      'plugins': ['@typescript-eslint', 'deprecation'],
      'extends': ['eslint-config-brisk/tslint'],
      'rules': {
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'warn',
        'class-methods-use-this': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-case-declarations': 'off',
        'no-warning-comments': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'deprecation/deprecation': 'error',
      },
    },
    {
      'files': ['*.js'],
      'extends': ['eslint-config-brisk/jslint'],
    },
  ],

};
