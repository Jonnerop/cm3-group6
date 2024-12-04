const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { signup, login } = require('../controllers/userController');

router.post('/signup', upload.single("picture"), signup);

router.post('/login', login);

module.exports = router;