const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const signup = async (req, res) => {
    const { name,
        username,
        password,
        phone_number,
        gender,
        date_of_birth,
        membership_status,
        address,
        profile_picture
    } = req.body;
    try {
        if (!name ||
            !username ||
            !password ||
            !phone_number ||
            !gender ||
            !date_of_birth ||
            !membership_status ||
            !address
        ) {
            res.status(400);
            throw new Error("Please add all fields");
        }

        const userExists = await User.findOne({ username });

        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(13);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name, username, password: hashedPassword,
            phone_number, gender, date_of_birth, address,
            membership_status, profile_picture
        });

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

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user._id);
            res.status(200).json({ username, token });
        } else {
            res.status(400).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMe = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    signup,
    login,
    getMe,
};
