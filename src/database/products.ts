import { openDatabase } from './authentication';

export const createProductsTable = async () => {
  const db = await openDatabase();

  db.transaction(tx => {
    // Create the table if it doesn't exist
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          price REAL NOT NULL,
          available_in TEXT NOT NULL
        );`,
      [],
      () => {
        console.log('Table created successfully');

        // Now we alter the table to add image_path
        tx.executeSql(
          `ALTER TABLE products ADD COLUMN image_path TEXT;`,
          [],
          () => {
            console.log('Column image_path added successfully');
          },
          error => {
            console.error('Error adding column image_path', error);
          },
        );
      },
      error => {
        console.error('Error creating table', error);
      },
    );
  });
};

export const insertProducts = async () => {
  const db = await openDatabase();

  // Check if products exist
  db.transaction(tx => {
    tx.executeSql(
      'SELECT COUNT(*) as count FROM products',
      [],
      (tx, results) => {
        const count = results.rows.item(0).count;

        // Only insert products if the table is empty
        if (count === 0) {
          const products = generateProducts(180); // Call your function to generate products

          products.forEach(product => {
            tx.executeSql(
              'INSERT INTO products (name, price, image_path, available_in) VALUES (?, ?, ?, ?)',
              [
                product.name,
                product.price,
                product.image_path,
                product.available_in,
              ],
              (tx, result) => {
                console.log(`Inserted ${product.name}`);
              },
              error => {
                console.error('Error inserting product', error);
              },
            );
          });
        } else {
          console.log('Products already exist in the database.');
        }
      },
      error => {
        console.error('Error counting products', error);
      },
    );
  });
};

const generateProducts = (count: number) => {
  const products = [];

  // Define available locations
  const availableStates = [
    'Delhi',
    'Haryana',
    'Punjab',
    'Rajasthan',
    'Maharashtra',
  ];

  for (let i = 1; i <= count; i++) {
    const name = `img${String(i).padStart(2, '0')}`; // Generates Item01, Item02, ...
    const image_path = `${name}.png`; // Adjust path as needed
    const price = Math.floor(Math.random() * 100) + 20; // Random price between 20 and 119

    // Randomly select 1 to 3 available locations
    const randomLocationsCount = Math.floor(Math.random() * 3) + 1; // Random count between 1 and 3
    const available_in = [];

    for (let j = 0; j < randomLocationsCount; j++) {
      const randomIndex = Math.floor(Math.random() * availableStates.length);
      const selectedState = availableStates[randomIndex];
      if (!available_in.includes(selectedState)) {
        available_in.push(selectedState);
      }
    }

    products.push({
      name: name,
      price: price,
      image_path: image_path,
      available_in: available_in.join(', '), // Join available locations as a string
    });
  }

  return products;
};

// Generate 180 products
export const createInventory = generateProducts(180);
