const express = require('express');
const userController = require('../controllers/users_controllers');

const userRouter = express.Router();

/* Ruta de logeo de usuario */
userRouter.post('/user_login', userController.login);

module.exports = {userRouter}