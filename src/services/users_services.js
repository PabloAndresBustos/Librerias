const { Users } = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { parameterByBody } = require('../validations/validation_parameters');

/* Buscar el usuario */
async function adminUser() {
    /* verificamos si el usuario admin ya esta creado en al base de datos */
    const user = await Users.findOne({
        where: {
            name: "admin"
        }
    })
    /* Si el usuario esta creado retornamos ese admin */
    if (user) {
        return user;
    }
}

/* Crear usuarios */
async function createUser(name, user_password) {

    parameterByBody(name, 'string');
    parameterByBody(user_password, 'string');

    /* Llamamos la funcion adminUser para ver si el admin existe */
    /* Segun la consigna el usuario solo tendra una ruta que es la de logeo 
    y no se crearan mas usuarios en la app. */

    const existUser = await adminUser();

    /* Si el usuario no existe crearemos uno */
    if (!existUser) {
        /* Primero estaremos encrypatando la contraseña con bcrypt
        tomamos el user_password ingresados y le damos 10 pasos de bcrypt. */
        const encryptPassword = await bcrypt.hash(user_password, 10);

        /* Luego creamos el nuevo objeto usuario */
        const user = new Users();

        /* Al nuevo usuario le asignamos el usuario y la contraseña encriptada anteriormente, con bcrypt. */
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

/* Loguear usuario */
async function userLogin(name, user_password) {

    parameterByBody(name, 'string');
    parameterByBody(user_password, 'string');

    /* Buscamos el usuario admin por nombre */
    const user = await Users.findOne({
        where: {
            name: name,
        }
    });

    /* Si encontramos el usuario vamos a desencriptar la contraseña guardada en la base de datos
     y la comparmos con la ingresada. */
    if (user) {
        const decryptPassword = await bcrypt.compare(user_password, user.user_password);

        /* Generamos el token de jwt para autenticar el usuario
        le asiganamos al token la contraseña desencriptada. */
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            password: decryptPassword
        }, 'keyOfToken');

        return {
            accessToken: token
        }
    }else{
        /* En caso de no obtener un usario se solicita al usuario verificar las credeciales de acceso. */
        throw new Error("Usuario no encontrado, favor de verificar las credenciales");
    }
}



module.exports = { userLogin, createUser, adminUser }