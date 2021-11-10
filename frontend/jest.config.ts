export default {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jsdom',
  modulePaths: ['src'],
  moduleNameMapper: {
    '^application(.*)$': '<rootDir>/src/application$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
