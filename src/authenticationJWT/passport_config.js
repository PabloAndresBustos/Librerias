const jwtPassport = require("passport-jwt");
const { Users } = require("../models/user");

/* Constantes donde guardamos el token extraido y de finimos la estrategia */
const JwtExtract = jwtPassport.ExtractJwt;
const JwtStrategy = jwtPassport.Strategy;

/* Configuramos la estrategia de passport */
const PassportStrategy = new JwtStrategy(
  {
    /* Extraemos el token desde la solicitud y la llave del token configurado en JWT */
    jwtFromRequest: JwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: "keyOfToken",
    /* CallBack para verificar la integridad del token */
  },
  async (jwtPayload, next) => {
    /* Buscaremos el usuario en la base de datos, con el id guardado en el payload */
    const user = await Users.findByPk(jwtPayload.id);

    if (user) {
      /* false, null se reciben del middleware */
      next(false, user, null);
    } else {
      next(true, null, null);
    }
  }
);

module.exports = PassportStrategy;
