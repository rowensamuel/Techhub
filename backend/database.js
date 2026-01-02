const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, '..', 'techhub.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    initializeDatabase();
  }
});

// Initialize database tables and seed data
function initializeDatabase() {
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      image TEXT,
      rating REAL DEFAULT 0,
      discount REAL DEFAULT 0,
      stock INTEGER DEFAULT 0,
      specs TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create cart table
  db.run(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      product_id TEXT NOT NULL,
      quantity INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (product_id) REFERENCES products (id),
      UNIQUE(user_id, product_id)
    )
  `);

  // Create orders table
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      total REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Create order_items table
  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL,
      product_id TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders (id),
      FOREIGN KEY (product_id) REFERENCES products (id)
    )
  `, () => {
    // Seed initial data
    seedInitialData();
  });
}

  // Seed initial data
  function seedInitialData() {
    // Seed admin user
    db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
      if (err) {
        console.error('Error checking users:', err);
        return;
      }

      if (row.count === 0) {
        // Create admin user
        const bcrypt = require('bcryptjs');
        bcrypt.hash('admin123', 10, (err, hashedPassword) => {
          if (err) {
            console.error('Error hashing admin password:', err);
            return;
          }

          db.run(
            'INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)',
            ['admin', 'admin@techhub.com', hashedPassword, 'Admin User', 'admin'],
            function(err) {
              if (err) {
                console.error('Error creating admin user:', err);
              } else {
                console.log('Admin user created: admin@techhub.com / admin123');
              }
            }
          );
        });
      }
    });

    const initialProducts = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      description: 'Forged in titanium. Featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system.',
      price: 159900,
      category: 'Mobiles',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop',
      rating: 4.9,
      discount: 5,
      stock: 12,
      specs: JSON.stringify(['Titanium Frame', '48MP Main Camera', 'A17 Pro Chip', 'USB-C'])
    },
    {
      id: '2',
      name: 'MacBook Air M3',
      description: 'The world\'s most popular laptop is better than ever with the blazing-fast M3 chip and a striking 13-inch Liquid Retina display.',
      price: 114900,
      category: 'Laptops',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
      rating: 4.8,
      discount: 10,
      stock: 8,
      specs: JSON.stringify(['M3 Chip', '13.6-inch Liquid Retina', 'Up to 18 hrs battery', 'MagSafe 3'])
    },
    {
      id: '3',
      name: 'Sony WH-1000XM5',
      description: 'Industry-leading noise cancellation and magnificent sound quality. Integrated Processor V1, 30-hour battery life.',
      price: 29990,
      category: 'Audio',
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1200&auto=format&fit=crop',
      rating: 4.7,
      discount: 15,
      stock: 25,
      specs: JSON.stringify(['Industry-leading NC', '30hr battery', 'Multipoint connection'])
    },
    {
      id: '4',
      name: 'Samsung Galaxy Watch 6',
      description: 'Track your workouts, sleep, and heart health on the biggest screen yet. Sophisticated design for every occasion.',
      price: 32999,
      category: 'Wearables',
      image: 'https://images.unsplash.com/photo-1544117518-30df578096a4?q=80&w=1200&auto=format&fit=crop',
      rating: 4.6,
      discount: 20,
      stock: 15,
      specs: JSON.stringify(['Sapphire Crystal', 'Body Composition', 'ECG Monitoring'])
    },
    {
      id: '5',
      name: 'Logitech MX Master 3S',
      description: 'Remastered for speed, precision, and silence. Quiet Clicks deliver a satisfying tactile feel with 90% less click noise.',
      price: 10995,
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1200&auto=format&fit=crop',
      rating: 4.9,
      discount: 0,
      stock: 50,
      specs: JSON.stringify(['Quiet Clicks', '8k DPI Tracking', 'MagSpeed Scrolling'])
    }
  ];

  // Check if products already exist
  db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
    if (err) {
      console.error('Error checking products:', err);
      return;
    }

    if (row.count === 0) {
      // Insert initial products
      const stmt = db.prepare(`
        INSERT INTO products (id, name, description, price, category, image, rating, discount, stock, specs)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      initialProducts.forEach(product => {
        stmt.run(
          product.id,
          product.name,
          product.description,
          product.price,
          product.category,
          product.image,
          product.rating,
          product.discount,
          product.stock,
          product.specs
        );
      });

      stmt.finalize();
      console.log('Initial products seeded.');
    }
  });
}

// User functions
function createUser(email, password, name, role = 'user') {
  return new Promise((resolve, reject) => {
    const id = Math.random().toString(36).substr(2, 9);
    db.run(
      'INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)',
      [id, email, password, name, role],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, email, name, role });
        }
      }
    );
  });
}

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT id, email, name, role FROM users WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// Product functions
function getAllProducts() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM products ORDER BY id DESC', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // Parse specs JSON
        rows.forEach(row => {
          if (row.specs) {
            try {
              row.specs = JSON.parse(row.specs);
            } catch (e) {
              row.specs = [];
            }
          }
        });
        resolve(rows);
      }
    });
  });
}

function getProductById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row && row.specs) {
        try {
          row.specs = JSON.parse(row.specs);
        } catch (e) {
          row.specs = [];
        }
        resolve(row);
      } else {
        resolve(row);
      }
    });
  });
}

function createProduct(product) {
  return new Promise((resolve, reject) => {
    const id = Math.random().toString(36).substr(2, 9);
    const { name, description, price, category, image, rating, discount, stock, specs } = product;
    const specsJson = JSON.stringify(specs || []);

    db.run(
      'INSERT INTO products (id, name, description, price, category, image, rating, discount, stock, specs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, description, price, category, image, rating, discount, stock, specsJson],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, ...product });
        }
      }
    );
  });
}

function updateProduct(id, product) {
  return new Promise((resolve, reject) => {
    const { name, description, price, category, image, rating, discount, stock, specs } = product;
    const specsJson = JSON.stringify(specs || []);

    db.run(
      'UPDATE products SET name = ?, description = ?, price = ?, category = ?, image = ?, rating = ?, discount = ?, stock = ?, specs = ? WHERE id = ?',
      [name, description, price, category, image, rating, discount, stock, specsJson, id],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, ...product });
        }
      }
    );
  });
}

function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ deleted: this.changes > 0 });
      }
    });
  });
}

// Cart functions
function getUserCart(userId) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT c.*, p.name, p.price, p.image, p.category
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
    `;
    db.all(query, [userId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function addToCart(userId, productId, quantity) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT OR REPLACE INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
      [userId, productId, quantity],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, userId, productId, quantity });
        }
      }
    );
  });
}

function updateCartQuantity(userId, productId, quantity) {
  return new Promise((resolve, reject) => {
    if (quantity <= 0) {
      return removeFromCart(userId, productId).then(() => resolve(null));
    }

    db.run(
      'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
      [quantity, userId, productId],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ userId, productId, quantity });
        }
      }
    );
  });
}

function removeFromCart(userId, productId) {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ deleted: this.changes > 0 });
        }
      }
    );
  });
}

function clearCart(userId) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM cart WHERE user_id = ?', [userId], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ cleared: true });
      }
    });
  });
}

// Order functions
function getUserOrders(userId) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT o.*, oi.product_id, oi.quantity, oi.price, p.name, p.image
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    `;
    db.all(query, [userId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // Group order items by order
        const orders = {};
        rows.forEach(row => {
          if (!orders[row.id]) {
            orders[row.id] = {
              id: row.id,
              userId: row.user_id,
              total: row.total,
              status: row.status,
              date: row.created_at,
              address: JSON.parse(row.address || '{}'),
              items: []
            };
          }
          if (row.product_id) {
            orders[row.id].items.push({
              id: row.product_id,
              name: row.name,
              image: row.image,
              quantity: row.quantity,
              price: row.price
            });
          }
        });
        resolve(Object.values(orders));
      }
    });
  });
}

function createOrder(userId, orderData) {
  return new Promise((resolve, reject) => {
    const { items, total, address } = orderData;
    const orderId = Math.random().toString(36).substr(2, 9);
    const addressJson = JSON.stringify(address);

    db.run(
      'INSERT INTO orders (id, user_id, total, address) VALUES (?, ?, ?, ?)',
      [orderId, userId, total, addressJson],
      function(err) {
        if (err) {
          reject(err);
        } else {
          // Insert order items
          const stmt = db.prepare(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)'
          );

          items.forEach(item => {
            stmt.run(orderId, item.id, item.quantity, item.price);
          });

          stmt.finalize();

          // Clear user's cart
          clearCart(userId);

          resolve({
            id: orderId,
            userId,
            items,
            total,
            status: 'pending',
            date: new Date().toISOString(),
            address
          });
        }
      }
    );
  });
}

module.exports = {
  db,
  createUser,
  getUserByEmail,
  getUserById,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getUserCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  getUserOrders,
  createOrder
};
