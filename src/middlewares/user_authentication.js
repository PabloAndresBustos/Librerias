const passport = require('passport');

const userAuthenticate = (req, res, next)=>{
    passport.authenticate('jwt', {session: false}, (err, user, info)=>{

        if(err || !user){
            const error = new Error("Usuario invalido, Favor de verificar las credenciales.");
            return next(error);
        }

        next();
    })(req, res, next)
}

module.exports = {userAuthenticate}