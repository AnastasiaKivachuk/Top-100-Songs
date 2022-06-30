// @ts-ignore
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/coverage', '<rootDir>/dist'],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@constants/(.*)': '<rootDir>/src/constants/$1',
    '@contexts/(.*)': '<rootDir>/src/contexts/$1',
    '@dtos/(.*)': '<rootDir>/src/dtos/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@redux/(.*)': '<rootDir>/src/redux/$1',
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  // transform: {
  //   '^.+\\.scss$': 'jest-scss-transform',
  // },
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
