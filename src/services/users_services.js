const { Users } = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { parameterByBody } = require('../validaciones/validation_parameters');

/* Buscar el usuario */
async function adminUser() {
    const user = await Users.findOne({
        where: {
            name: "admin"
        }
    })

    if (user) {
        return user;
    }
}

/* Loguear usuario */
async function userLogin(name, user_password) {

    parameterByBody(name, 'string');
    parameterByBody(user_password, 'string');

    const user = await Users.findOne({
        where: {
            name: name,
        }
    });

    if (user) {
        const decryptPassword = await bcrypt.compare(user_password, user.user_password);

        const token = jwt.sign({
            id: user.id,
            name: user.name,
            password: decryptPassword
        }, 'keyOfToken');

        return {
            accessToken: token
        }
    }else{
        throw new Error("Usuario no encontrado, favor de verificar las credenciales");
    }
}

/* Crear usuarios */
async function createUser(name, user_password) {

    parameterByBody(name, 'string');
    parameterByBody(user_password, 'string');

    const existUser = await adminUser();

    if (!existUser) {
        const encryptPassword = await bcrypt.hash(user_password, 10);

        const user = new Users();

        user.name = name
        user.user_password = encryptPassword

        await user.save();
        console.log('*********************************************');
        console.log(`Usuario admin creado satisfacroriamente`);
        console.log('*********************************************');

    } else {
        console.log('*********************************************');
        console.log("El Usuario ya se encuentra en al base de datos.");
        console.log('*********************************************');
    }
}



module.exports = { userLogin, createUser, adminUser }