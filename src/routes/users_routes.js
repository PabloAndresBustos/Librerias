const express = require('express');
const userController = require('../controllers/users_controllers');

const userRouter = express.Router();

userRouter.post('/user_login', userController.login);

module.exports = {userRouter}