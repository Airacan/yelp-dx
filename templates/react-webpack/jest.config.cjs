module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.(js|jsx)', '**/?(*.)+(spec|test).(js|jsx)'],
  transform: { '^.+\\.(js|jsx)$': 'babel-jest' },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleFileExtensions: ['js', 'jsx']
};
