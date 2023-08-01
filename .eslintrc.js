/* eslint-disable no-mixed-spaces-and-tabs */

module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
	  'node': true,
	  'jest': true,
  },
  'extends': 'eslint:recommended',
  'overrides': [
  ],
  'parserOptions': {
	  'ecmaVersion': 'latest'
  },
  'rules': {
	  'indent': [
      'error',
      2
	  ],
	  'eqeqeq': 'error',
	  'no-trailing-spaces': 'error',
	  'object-curly-spacing': [
      'error', 'always'
	  ],
	  'arrow-spacing': [
      'error', { 'before': true, 'after': true }
	  ],
	  'no-console': 0,
	  'linebreak-style': [
      'error',
      'unix'
	  ],
	  'quotes': [
      'error',
      'single'
	  ],
	  'semi': [
      'error',
      'never'
	  ]
  }
}
