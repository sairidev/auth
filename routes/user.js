const express = require('express');
const data_verification = require('../middlewares/data_verification');
const user_controller = require('../controllers/user');

const user = express();

user.post('/signin', data_verification, user_controller.signin);
user.post('/signup', data_verification, user_controller.signup);

module.exports = user;
