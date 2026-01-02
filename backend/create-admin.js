const bcrypt = require('bcryptjs');
const db = require('./database');

async function createAdminUser() {
  try {
    const email = 'admin@techhub.com';
    const password = 'admin123';
    const name = 'Admin User';

    // Check if admin already exists
    const existingAdmin = await db.getUserByEmail(email);
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const adminUser = await db.createUser(email, hashedPassword, name, 'admin');

    console.log('Admin user created successfully:', adminUser);
    console.log('Email: admin@techhub.com');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    process.exit();
  }
}

createAdminUser();
