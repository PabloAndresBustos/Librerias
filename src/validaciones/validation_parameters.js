function parameterByBody(parameter, type) {
  if (typeof parameter !== type || parameter === "" || parameter === null) {
    console.log("El usuario esta colocando parametros invalidos");
    throw new Error(
      `El o los parametros debe ser del tipo: ${type}, No debe ser null o vacio`
    );
  }
}

function parameterByParams(parameter) {
  const paramsParameter = parseInt(parameter, 10);
  if (isNaN(paramsParameter)) {
    throw new Error(
      "El parametro id deber ser del tipo: number, no null o vacio"
    );
  }
}

module.exports = { parameterByBody, parameterByParams };
