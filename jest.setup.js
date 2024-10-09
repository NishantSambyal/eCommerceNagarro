import bcrypt from 'react-native-bcrypt';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-sqlite-storage', () => ({
  openDatabase: jest.fn(() => ({
    transaction: jest.fn(callback => {
      const tx = {
        executeSql: jest.fn((query, params, successCallback, errorCallback) => {
          if (typeof successCallback === 'function') {
            successCallback({
              rows: {
                length: 0,
                item: jest.fn(), // Mocking rows item method
              },
            });
          } else if (typeof errorCallback === 'function') {
            errorCallback(new Error('Mocked SQL Error'));
          }
        }),
      };
      callback(tx);
    }),
  })),
}));

jest.mock('react-native-sqlite-storage');

// Set a simple random number generator for testing purposes
bcrypt.setRandomFallback(() => Math.random());
