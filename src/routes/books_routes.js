const express = require('express');
const booksController = require('../controllers/books_controllers');
const { userAuthenticate } = require('../middlewares/user_authentication');

const booksRouter = express.Router();

/* Ruta para obtener todos los libros */
booksRouter.get('/books', booksController.takeAllBooks);

/* Ruta para poder registrar nuevo libros */
booksRouter.post('/new_book',userAuthenticate, booksController.addBook);

/* Ruta para obtener un libro */
booksRouter.get('/the_book/:id',booksController.theBook);

/* Ruta para editar libros */
booksRouter.put('/edit_book/:id',userAuthenticate, booksController.modifyBook);

/* Ruta para eliminar libros */
booksRouter.delete('/remove_book/:id',userAuthenticate, booksController.removeBook);

/* Ruta adicional para traer los libros dados de baja */
booksRouter.get('/books',userAuthenticate, booksController.allDownBooks);

module.exports = {booksRouter}