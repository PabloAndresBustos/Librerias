/* Funcion para verificar que los parametros ingresados por el body sean validos. */
function parameterByBody(parameter, type){
    /* Verificamos que si el parametro no es del tipo string, si es un string vacion o si es nulo. */
    if(typeof parameter !== type || parameter === "" || parameter === null){
        console.log("El usuario esta colocando parametros invalidos");
        throw new Error(`El o los parametros debe ser del tipo: ${type}, No debe ser null o vacio`);
    }    
}

/* Funcion para verifica que los parametros ingresados por URL sean validos. */
function parameterByParams(parameter){
    /* Dado que el parametro por URL es tomado como un string lo convierto a un numero de base 10 */
    const paramsParameter = parseInt(parameter, 10);
    /* NaN: La propiedad global NaN es un valor que representa Not-A-Number. Verificamos si el parametro
    es un numero. */
    if(isNaN(paramsParameter)){
        /* Si no indicamos que el parametro debe ser del tipo indicado. */
        throw new Error("El parametro id deber ser del tipo: number, no null o vacio");
    }
}

module.exports = {parameterByBody, parameterByParams}