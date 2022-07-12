// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/coverage', '<rootDir>/dist',
  ],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/pages/_app.tsx', '<rootDir>/src/pages/_document.js', '<rootDir>/src/common/interfaces', '<rootDir>/src/common/constants',
    '<rootDir>/src/common/validation', '<rootDir>/src/redux/store.ts', '<rootDir>/src/redux/actions', '<rootDir>/src/services',
    '<rootDir>/src/redux/reducers/index.ts',
  ],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@constants/(.*)': '<rootDir>/src/common/constants/$1',
    '@contexts/(.*)': '<rootDir>/src/contexts/$1',
    '@interfaces/(.*)': '<rootDir>/src/common/interfaces/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@redux/(.*)': '<rootDir>/src/redux/$1',
    '@helpers/(.*)': '<rootDir>/src/common/helpers/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@hookform/(.*)': '<rootDir>/node_modules/@hookform/$1',
    '@components/(.*)': '<rootDir>/src/common/components/$1',
    '@validation/(.*)': '<rootDir>/src/common/validation/$1',
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
