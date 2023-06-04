const passport = require('passport');
const PassportStrategy = require('./passport_config');

/* Funcion donde le indicamos a passport que use la estrategia configurada */
function authenticationStart(){
    passport.use(PassportStrategy);
}

module.exports = {authenticationStart}