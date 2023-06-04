const jwtPassport = require('passport-jwt');
const {Users} = require('../models/user');

const JwtExtract = jwtPassport.ExtractJwt
const JwtStrategy = jwtPassport.Strategy

const PassportStrategy = new JwtStrategy({
    jwtFromRequest: JwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'keyOfToken'
}, async (jwtPayload, next)=>{
    /* CallBack para verificar la integridad del token */

    if(!jwtPayload){
        throw new Error("El usuario no esta logeado");
    }

    const user = await Users.findByPk(jwtPayload.id);

    if(user){
        /* false, null se reciben del middleware  */
        next(false, user, null)
    }else{
        next(true, null, null)
    }
});


module.exports = PassportStrategy