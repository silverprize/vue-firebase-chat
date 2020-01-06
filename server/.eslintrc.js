module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'standard',
    'plugin:node/recommended'
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ["error", { anonymous: 'always', asyncArrow: 'always', named: 'never' }]
  }
}
