const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes setup
const recordRoutes = require('./routes/recordRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/records', recordRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Finance Backend API is running' });
});

const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    try {
        let uri = process.env.MONGODB_URI;
        const isDev = process.env.NODE_ENV === 'development';
        
        if (!uri) {
            if (isDev) {
                console.warn('No MONGODB_URI found. Starting In-Memory MongoDB for development...');
                const mongoServer = await MongoMemoryServer.create();
                uri = mongoServer.getUri();
                await mongoose.connect(uri);
                console.log('MongoDB Connected to Memory Server:', uri);
                
                const seed = require('./seed-function');
                await seed();
                console.log('Database auto-seeded.');
            } else {
                throw new Error('MONGODB_URI is required in production environment.');
            }
        } else {
            await mongoose.connect(uri);
            console.log('MongoDB Connected successfully!');
        }
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
            process.exit(1);
        }
    }
};

// Export the app for Vercel
module.exports = app;


// Connect to Database
connectDB();

// Only listen if not running as a Vercel function
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        console.log(`Test UI/API at: http://localhost:${PORT}`);
    });
}
