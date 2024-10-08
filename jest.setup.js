import bcrypt from 'react-native-bcrypt';

jest.mock('react-native-sqlite-storage', () => {
  const mockSQLite = {
    openDatabase: jest.fn((_, success) => {
      const db = {
        transaction: jest.fn(cb => {
          const tx = {
            executeSql: jest.fn((_, __, successCallback) => successCallback()),
          };
          cb(tx);
        }),
      };
      success(db);
    }),
  };
  return mockSQLite;
});

jest.mock('react-native-sqlite-storage');

// Set a simple random number generator for testing purposes
bcrypt.setRandomFallback(() => Math.random());
