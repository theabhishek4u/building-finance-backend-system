const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seed = require('./seed-function');

dotenv.config();

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/finance-db');
    console.log('Connected to MongoDB for manual seeding...');
    await seed();
    process.exit();
  } catch (err) {
    console.error(`Error seeding data: ${err.message}`);
    process.exit(1);
  }
};

runSeed();
