const userManager = require('../services/users_services')


/* Logueo usuarios */
async function login(req, res, next){
    /* Solicitamos las credencias de acceso */
    const {name, user_password} = req.body;
    try {
        const user = await userManager.userLogin(name, user_password);   
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {login}