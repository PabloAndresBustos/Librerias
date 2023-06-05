const librariesManager = require("../services/libraries_services");

/* Crear una nueva libreria */
async function createLibrary(req, res, next) {
  const { name, location, phone } = req.body;

  try {
    const libray = await librariesManager.registerLibrary(
      name,
      location,
      phone
    );
    res.status(201).send(libray);
  } catch (error) {
    next(error);
  }
}

/* Obtener una libreria con todos sus libros */
async function oneLibrary(req, res, next) {
  const { id } = req.params;

  try {
    const library = await librariesManager.getLibrary(id);
    res.status(200).send(library);
  } catch (error) {
    next(error);
  }
}

/* Obtener todas las librerias */
async function allLibraries(req, res, next) {
  try {
    const libraries = await librariesManager.takeAll();
    res.status(200).send(libraries);
  } catch (error) {
    next(error);
  }
}

/* Obtener todas las librerias dadas de baja */
async function allDownLibraries(req, res, next) {
  try {
    const libraries = await librariesManager.allDown();
    res.status(200).send(libraries);
  } catch (error) {
    next(error);
  }
}

/* Modificar Libreria */
async function modifyLibrary(req, res, next) {
  const { id } = req.params;
  const { name, location, phone, is_deleted } = req.body;

  try {
    const library = await librariesManager.editLibrary(
      id,
      name,
      location,
      phone,
      is_deleted
    );
    res.status(201).send(library);
  } catch (error) {
    next(error);
  }
}

/* Eliminar una libreia */
async function removeLibrary(req, res, next) {
  const { id } = req.params;

  try {
    await librariesManager.deletedLibrary(id);
    res.status(200).send(`La libreria se elimino correctamente`);
  } catch (error) {
    next(error);
  }
}

async function moreBook(req, res, next) {
  const { id } = req.params;
  const { isbn, title, autor, publish_year } = req.body;

  try {
    const library = await librariesManager.addBook(
      id,
      isbn,
      title,
      autor,
      publish_year
    );
    res.status(201).send(library);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  allLibraries,
  createLibrary,
  oneLibrary,
  modifyLibrary,
  removeLibrary,
  moreBook,
  allDownLibraries,
};
