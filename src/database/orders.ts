import { openDatabase } from './authentication';

export const createOrderTables = async () => {
  const db = await openDatabase();

  db.transaction(tx => {
    // Create the orders table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS orders (
          order_id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          total_amount REAL,
          order_date TEXT,
          status TEXT,
          FOREIGN KEY(user_id) REFERENCES users(id)
        );`,
      [],
      () => {
        console.log('Orders table created successfully');
      },
      error => {
        console.log('Error creating orders table: ', error.message);
      },
    );

    // Create the order_status table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS order_status (
          status_id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_id INTEGER,
          status TEXT, 
          status_date TEXT,
          FOREIGN KEY(order_id) REFERENCES orders(order_id)
        );`,
      [],
      () => {
        console.log('Order status table created successfully');
      },
      error => {
        console.log('Error creating order status table: ', error.message);
      },
    );
  });
  createOrderItemsTable();
};

export const createOrderItemsTable = async () => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS order_items (
            order_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER,
            item_id INTEGER,
            item_name TEXT,
            item_price REAL,
            quantity INTEGER,
            FOREIGN KEY(order_id) REFERENCES orders(order_id)
          );`,
        [],
        (tx, result) => {
          console.log('Order items table created successfully');
          resolve(result);
        },
        (tx, error) => {
          console.log('Error creating order items table:', error.message);
          reject(error);
        },
      );
    });
  });
};
export const fetchOrderItems = async orderId => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM order_items WHERE order_id = ?',
        [orderId],
        (tx, results) => {
          const items = [];
          for (let i = 0; i < results.rows.length; i++) {
            items.push(results.rows.item(i));
          }
          resolve(items);
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
};

export const placeOrder = async (userId, cartItems, totalAmount) => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      const orderDate = new Date().toISOString();

      // Insert into orders table
      tx.executeSql(
        'INSERT INTO orders (user_id, total_amount, order_date, status) VALUES (?, ?, ?, ?)',
        [userId, totalAmount, orderDate, 'Ordered'],
        (tx, result) => {
          const orderId = result.insertId;

          // Insert the initial order status
          tx.executeSql(
            'INSERT INTO order_status (order_id, status, status_date) VALUES (?, ?, ?)',
            [orderId, 'Ordered', orderDate],
            (tx, result) => {
              // Insert each item from the cart into the order_items table
              cartItems.forEach(item => {
                tx.executeSql(
                  'INSERT INTO order_items (order_id, item_id, item_name, item_price, quantity) VALUES (?, ?, ?, ?, ?)',
                  [orderId, item.id, item.name, item.price, item.quantity],
                  (tx, result) => {
                    console.log('Item added to order_items:', item);
                  },
                  error => {
                    console.log(
                      'Error adding item to order_items:',
                      error.message,
                    );
                  },
                );
              });

              // Resolve the promise once all cart items are added
              resolve(orderId);
            },
            error => reject(error),
          );
        },
        error => reject(error),
      );
    });
  });
};

export const updateOrderStatus = async (orderId, status) => {
  const db = await openDatabase();
  const statusDate = new Date().toISOString();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Update status
      tx.executeSql(
        'UPDATE orders SET status = ? WHERE order_id = ?',
        [status, orderId],
        (tx, result) => {
          // Insert into order_status for history
          tx.executeSql(
            'INSERT INTO order_status (order_id, status, status_date) VALUES (?, ?, ?)',
            [orderId, status, statusDate],
            resolve,
            error => reject(error),
          );
        },
        error => reject(error),
      );
    });
  });
};

export const fetchOrderHistory = async userId => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM orders WHERE user_id = ?',
        [userId],
        (tx, results) => resolve(results.rows.raw()), // Fetch all orders
        error => reject(error),
      );
    });
  });
};
