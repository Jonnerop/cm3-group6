const express = require('express');
const app = express();
const jobRouter = require('./routes/jobRouter');
const userRouter = require('./routes/userRouter');
const connectDB = require('./config/db');
const { unknownEndpoint, errorHandler } = require('./middleware/customMiddleware');
const cors = require('cors');

const corsOptions = {
    origin: 'https://cm3-group6-front-with-auth.onrender.com/', // Replace with your deployed frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies if needed
};

require('dotenv').config();

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/jobs", jobRouter);

app.use("/api/users", userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;