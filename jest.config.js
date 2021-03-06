module.exports = {
  rootDir: './',
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$':
      '<rootDir>/node_modules/babel-jest'
  },
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{tsx}',
    '!src/**/*.spec.{tsx}',
    '!**/node_modules/**',
    '!src/**/_aop.{tsx}',
    '!src/**/_document.{tsx}'
  ],
  coverageReporters: ['clover', 'json', 'lcov']
};
