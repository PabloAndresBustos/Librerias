const passport = require("passport");

/* Funcion para autenticar al usuario. */
const userAuthenticate = (req, res, next) => {
  /* Usamos el metodo authenticate de passport donde colocamos la estrategia en este caso JWT */
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    /* En el CallBack verificamos si recibimos un error o no recibimos usuario para en ese caso 
        devolveremos el mensage de usuario no valido */
    if (err || !user) {
      const error = new Error(
        "Usuario no valido, Favor de verificar las credenciales."
      );
      return next(error);
    }
    next();
  })(req, res, next);
};

module.exports = { userAuthenticate };
