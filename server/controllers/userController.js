const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

const signup = async (req, res) => {
    const { name, username, password, phone_number,
        gender, date_of_birth, membership_status, address,
        profile_picture } = req.body;
    try {
        if (!name || !username || !password ||
            !phone_number || !gender || !date_of_birth ||
            !membership_status || !address) {
            res.status(400).json({ message: "All fields are required" });
        }

        const userExits = await User.findOne({ username });
        if (userExits) {
            res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(13);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name, username, password: hashedPassword,
            phone_number, gender, date_of_birth, address,
            membership_status, profile_picture });

        if (user) {
            const token = generateToken(user._id);
            res.status(201).json({ username, token });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};