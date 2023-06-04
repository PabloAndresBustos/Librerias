const express = require('express');
const librariesController = require('../controllers/libraries_controllers');
const { userAuthenticate } = require('../middlewares/user_authentication');

const librariesRouter = express.Router();

/* Ruta para obtener todas la librerias */
librariesRouter.get('/all_libraries', librariesController.allLibraries);

/* Ruta para registrar una nueva libreria */
librariesRouter.post('/library_register',userAuthenticate, librariesController.createLibrary);

/* Ruta para obtener una libreria */
librariesRouter.get('/the_library/:id', librariesController.oneLibrary);

/* Ruta para Editar librerias */
librariesRouter.put('/change_library/:id',userAuthenticate, librariesController.modifyLibrary);

/* Ruta para eliminar librerias */
librariesRouter.delete('/remove_library/:id',userAuthenticate, librariesController.removeLibrary);

/* Ruta para agregar libros a la libreria */
librariesRouter.post('/add_book/:id',userAuthenticate, librariesController.moreBook);

/* Ruta adicional para las que estan dadas de baja */
librariesRouter.get('/down_libraries',userAuthenticate, librariesController.allDownLibraries);

module.exports = {librariesRouter}