module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/packages/quality/src'],
  testMatch: ['**/__tests__/**/*.spec.ts'],
  collectCoverageFrom: [
    'packages/quality/src/modules/**/*.service.ts',
    'packages/quality/src/modules/**/*.controller.ts',
    '!**/__tests__/**',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '^@quality/(.*)$': '<rootDir>/packages/quality/src/$1',
    '^@core/(.*)$': '<rootDir>/packages/core-domain/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
};
