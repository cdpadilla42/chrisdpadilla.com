const nextJest = require('next/jest');
// import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': `<rootDir>/__mocks__/fileMock.js`,

    // Handle module aliases
    '^@/components/(.*)$': '<rootDir>/components/$1',

    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  // transform: {
  //   // Use babel-jest to transpile tests with the next/babel preset
  //   // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
  //   // '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  //   // '^.+\\.js?$': require.resolve('babel-jest'),
  //   '^.+\\.[t|j]sx?$': 'ts-jest',
  //   // 'node_modules/remark': require.resolve('babel-jest'),
  // },
  transform: {},
  transformIgnorePatterns: [
    'node_modules/(?!remark/)',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  testPathIgnorePatterns: ['/node_modules/(?!remark)', '<rootDir>/.next/'],
  testEnvironment: 'jest-environment-jsdom',
  // testEnvironment: 'jest-environment-node',
  modulePathIgnorePatterns: ['./cypress'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
// export default createJestConfig(customJestConfig);
