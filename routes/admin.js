const express = require('express');
const admin_middleware = require('../middlewares/admin');
const admin_controller = require('../controllers/admin');

const admin = express();

admin.patch('/', admin_middleware, admin_controller.updateRole);
admin.delete('/', admin_middleware, admin_controller.deleteteUser);

module.exports = admin;
