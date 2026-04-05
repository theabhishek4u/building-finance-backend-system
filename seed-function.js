const mongoose = require('mongoose');
const User = require('./models/User');
const Record = require('./models/Record');

const users = [
  {
    name: 'Admin User',
    email: 'admin@finance.com',
    role: 'admin',
    status: 'active',
  },
  {
    name: 'Analyst User',
    email: 'analyst@finance.com',
    role: 'analyst',
    status: 'active',
  },
  {
    name: 'Viewer User',
    email: 'viewer@finance.com',
    role: 'viewer',
    status: 'active',
  },
];

const records = [
  { amount: 5000, type: 'income', category: 'Salary', description: 'Monthly salary credit', date: new Date('2026-03-01') },
  { amount: 1500, type: 'expense', category: 'Rent', description: 'March Rent payment', date: new Date('2026-03-05') },
  { amount: 200, type: 'expense', category: 'Utilities', description: 'Electricity bill', date: new Date('2026-03-10') },
  { amount: 300, type: 'income', category: 'Freelance', description: 'UI Design project', date: new Date('2026-03-15') },
  { amount: 50, type: 'expense', category: 'Food', description: 'Grocery shopping', date: new Date('2026-03-20') },
];

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Record.deleteMany();
    console.log('Cleared existing data.');

    // Seed users
    const createdUsers = await User.insertMany(users);
    console.log(`Seeded ${createdUsers.length} users:`);
    createdUsers.forEach((u) => console.log(` - ${u.name} (${u.role}): ID = ${u._id}`));

    // Seed records
    const createdRecords = await Record.insertMany(records);
    console.log(`Seeded ${createdRecords.length} financial records.`);

    console.log('Seeding completed successfully!');
    return createdUsers;
  } catch (err) {
    console.error(`Error seeding data: ${err.message}`);
    throw err;
  }
};

module.exports = seedData;
