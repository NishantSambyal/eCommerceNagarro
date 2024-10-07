import { openDatabase } from './authentication';

export const fetchProducts = async () => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM products',
        [],
        (tx, results) => {
          const items = [];
          for (let i = 0; i < results.rows.length; i++) {
            items.push(results.rows.item(i));
          }
          resolve(items);
        },
        error => {
          reject(error);
          console.error('Error fetching products', error);
        },
      );
    });
  });
};

export const createCartTable = async () => {
  const db = await openDatabase();

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        product_id INTEGER,
        quantity INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      );`,
      [],
      () => {
        console.log('Cart table created successfully');
      },
      error => {
        console.error('Error creating cart table', error);
      },
    );
  });
};

export const addToCart = async (userId: number, productId: number) => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Check if the product is already in the user's cart
      tx.executeSql(
        'SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId],
        (tx, results) => {
          if (results.rows.length > 0) {
            // If the product is already in the cart, update the quantity
            const currentQuantity = results.rows.item(0).quantity;
            tx.executeSql(
              'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
              [currentQuantity + 1, userId, productId],
              (tx, result) => {
                resolve(result);
              },
              error => {
                reject(error);
              },
            );
          } else {
            // If the product is not in the cart, insert a new entry
            tx.executeSql(
              'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)',
              [userId, productId],
              (tx, result) => {
                resolve(result);
              },
              error => {
                reject(error);
              },
            );
          }
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

export const removeFromCart = async (userId: number, productId: number) => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Check if the product is in the cart
      tx.executeSql(
        'SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId],
        (tx, results) => {
          if (results.rows.length > 0) {
            const currentQuantity = results.rows.item(0).quantity;
            if (currentQuantity > 1) {
              // Decrease the quantity
              tx.executeSql(
                'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
                [currentQuantity - 1, userId, productId],
                (tx, result) => {
                  resolve(result);
                },
                error => {
                  reject(error);
                },
              );
            } else {
              // If only one item, remove the product from the cart
              tx.executeSql(
                'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
                [userId, productId],
                (tx, result) => {
                  resolve(result);
                },
                error => {
                  reject(error);
                },
              );
            }
          } else {
            resolve(null); // Product not found in cart
          }
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

export const fetchCartItems = async (userId: number) => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT p.id, p.name, p.price, p.image_path, c.quantity 
           FROM cart c 
           JOIN products p ON c.product_id = p.id 
           WHERE c.user_id = ?`,
        [userId],
        (tx, results) => {
          const cartItems = [];
          for (let i = 0; i < results.rows.length; i++) {
            cartItems.push(results.rows.item(i));
          }
          resolve(cartItems);
        },
        error => {
          reject(error);
        },
      );
    });
  });
};

// clearCart.js in your ListingAndCart module
export const clearCart = async userId => {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM cart WHERE user_id = ?',
        [userId],
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

export const getTotalCartItems = cart => {
  return cart.reduce((total, item) => total + item.quantity, 0).toString();
};
