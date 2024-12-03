require('dotenv').config();
require('express-async-errors');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');

const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// Routes
const authRouter = require('./routes/auth');
app.use('/api/v1/auth/', authRouter);

// Error Handler Middleware (placed last)
const errorHandler = require('./error/errorHandler');
app.use(errorHandler);

// Database Connection and Server Start
const connectDB = require('./db/connect');
const start = async () => {
    const port = process.env.PORT || 3000;
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Connected to the database');
        app.listen(port, () => console.log('Server listening on port ' + port));
    } catch (error) {
        console.error('Failed to connect to the database', error.message);
        process.exit(1); // Exit process with failure
    }
};

start();
