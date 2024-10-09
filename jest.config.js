module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  setupFiles: ['./jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-redux|redux-persist|@react-native|react-navigation|react-native)/)', // Add necessary modules here
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
