// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User'); // adjust if needed

async function createAdmin() {
  if (process.env.ALLOW_ADMIN_CREATION !== 'true') {
    console.log('Admin creation is disabled by flag.');
    return;
  }

  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: 'admin@bookstore.com' });
  if (existing) {
    console.log('Admin already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash('Admin@1234', 10);
  const admin = new User({
    name: 'Admin',
    email: 'admin@bookstore.com',
    password: hashedPassword,
    role: 'admin',
  });

  await admin.save();
  console.log('Admin user created ✅');
  mongoose.disconnect();
}

createAdmin();
