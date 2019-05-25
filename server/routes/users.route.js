const express = require('express');
const users = express.Router();



const users_controller = require('../controllers/users.controlle');

process.env.SECRET_KEY = 'secret'; 

users.post('/register',users_controller.users_create);
users.post('/login',users_controller.users_login);


module.exports = users;