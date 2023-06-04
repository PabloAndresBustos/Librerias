const express = require('express');
const librariesController = require('../controllers/libraries_controllers');
const { userAuthenticate } = require('../middlewares/user_authentication');

const librariesRouter = express.Router();

librariesRouter.get('/all_libraries', librariesController.allLibraries);
librariesRouter.post('/library_register',userAuthenticate, librariesController.createLibrary);
librariesRouter.get('/the_library/:id', librariesController.oneLibrary);
librariesRouter.put('/change_library/:id',userAuthenticate, librariesController.modifyLibrary);
librariesRouter.delete('/remove_library/:id',userAuthenticate, librariesController.removeLibrary);
librariesRouter.post('/add_book/:id',userAuthenticate, librariesController.moreBook);

/* Ruta adicional para las que estan dadas de baja */
librariesRouter.get('/down_libraries',userAuthenticate, librariesController.allDownLibraries);

module.exports = {librariesRouter}