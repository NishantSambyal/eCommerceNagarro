import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import bcrypt from 'react-native-bcrypt';

// Open the database
export const openDatabase = (): Promise<SQLiteDatabase> => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      { name: 'userDatabase.db' },
      resolve,
      reject,
    );
  });
};

// Create user table
export const createTable = async () => {
  const db = await openDatabase();

  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT, full_name TEXT);',
    );
  });
};

// Function to register user
export const registerUser = async (
  email: string,
  password: string,
  fullName: string,
) => {
  const db = await openDatabase();

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)',
        [email, hashedPassword, fullName],
        (tx, result) => {
          resolve(result);
        },
        error => {
          reject(error.message);
        },
      );
    });
  });
};

export const loginUser = async (email: string, password: string) => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT id, email, full_name, password FROM users WHERE email = ?',
        [email],
        (tx, results) => {
          if (results.rows.length > 0) {
            const storedPassword = results.rows.item(0).password;
            const isPasswordValid = bcrypt.compareSync(
              password,
              storedPassword,
            );

            if (isPasswordValid) {
              // Return user details excluding password
              const userDetails = {
                id: results.rows.item(0).id,
                email: results.rows.item(0).email,
                fullName: results.rows.item(0).full_name,
              };
              resolve(userDetails);
            } else {
              resolve(null); // Password is invalid
            }
          } else {
            resolve(null); // User not found
          }
        },
        error => {
          reject(error.message);
        },
      );
    });
  });
};

// Initialize the database and create the user table
createTable();
