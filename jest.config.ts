// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/coverage', '<rootDir>/dist',
  ],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  coveragePathIgnorePatterns: [
    '<rootDir>/pages/_app.tsx', '<rootDir>/pages/_document.js', '<rootDir>/src/interfaces', '<rootDir>/src/constants',
    '<rootDir>/src/validation', '<rootDir>/src/redux/store.ts', '<rootDir>/src/redux/actions', '<rootDir>/src/services',
    '<rootDir>/src/redux/reducers/index.ts',
  ],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@constants/(.*)': '<rootDir>/src/constants/$1',
    '@contexts/(.*)': '<rootDir>/src/contexts/$1',
    '@dtos/(.*)': '<rootDir>/src/interfaces/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@redux/(.*)': '<rootDir>/src/redux/$1',
    '@helpers/(.*)': '<rootDir>/src/helpers/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
    '@containers/(.*)': '<rootDir>/src/containers/$1',
    '@hookform/(.*)': '<rootDir>/node_modules/@hookform/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@validation/(.*)': '<rootDir>/src/validation/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '^.+\\.(css|less|scss)$': 'babel-jest',
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
