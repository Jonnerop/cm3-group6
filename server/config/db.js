const mongoose = require('mongoose');
const config = require('../utils/config');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(config.MONGO_URI);
        console.log(`Connected to MongoDB: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;