const mockSQLite = {
  openDatabase: jest.fn(() => ({
    transaction: jest.fn(tx =>
      tx({
        executeSql: jest.fn(),
      }),
    ),
  })),
};

export default mockSQLite;
