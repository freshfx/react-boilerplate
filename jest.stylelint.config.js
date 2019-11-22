module.exports = {
  displayName: 'stylelint',
  moduleFileExtensions: ['js'],
  runner: 'jest-runner-stylelint',
  testMatch: [
    '<rootDir>/app/**/*.js',
    '!<rootDir>/app/**/*.test.js'
  ]
}
