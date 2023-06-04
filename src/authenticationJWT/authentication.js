const passport = require('passport');
const PassportStrategy = require('./passport_config');

function authenticationStart(){
    passport.use(PassportStrategy);
}

module.exports = {authenticationStart}