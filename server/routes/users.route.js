const express = require('express');
const users = express.Router();
const cors = require('cors');

users.use(cors());


const users_controller = require('../controllers/users.controller');

process.env.SECRET_KEY = 'secret'; 

users.post('/register',users_controller.users_create);
users.post('/login',users_controller.users_login);


module.exports = users;