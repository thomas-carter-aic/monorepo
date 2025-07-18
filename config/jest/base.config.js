/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Optional: use 'jsdom' for frontend packages
  // testEnvironment: 'jsdom',

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/__tests__/**/*.(ts|tsx|js)', '**/?(*.)+(spec|test).(ts|tsx|js)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/packages/$1/src'
  },

  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: '<rootDir>/tsconfig.base.json'
    }
  },

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },

  // Optional performance boosts
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/', '/.turbo/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/build/', '/.turbo/'],

  // Optional: set a coverage threshold
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
