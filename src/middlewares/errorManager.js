const wrongInCode = (err, req, res, next)=>{
    /* Dos constantes donde guardamos el mesage y el estado del error */
    const errStatus = err.status;
    const errMsg = err.message;
    
    /* Devolvemos el estado del error, con el mesage del error, en este caso los errores creados
    en las funciones. */
    res.status(errStatus).send({
        message: errMsg
    });
}

module.exports = {wrongInCode}