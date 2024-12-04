const express = require('express');
const app = express();
const jobRouter = require('./routes/jobRouter');
const userRouter = require('./routes/userRouter');
const connectDB = require('./config/db');
const {unknownEndpoint, errorHandler} = require('./middleware/customMiddleware');
const cors = require('cors');

require('dotenv').config();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/jobs", jobRouter);

app.use("/api/users", userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;