const express = require('express');
const booksController = require('../controllers/books_controllers');
const { userAuthenticate } = require('../middlewares/user_authentication');

const booksRouter = express.Router();

booksRouter.get('/books', booksController.takeAllBooks);
booksRouter.post('/new_book', userAuthenticate, booksController.addBook);
booksRouter.get('/the_book/:id', booksController.theBook);
booksRouter.put('/edit_book/:id', userAuthenticate, booksController.modifyBook);
booksRouter.delete('/remove_book/:id',userAuthenticate, booksController.removeBook);

/* Ruta adicional para traer los libros dados de baja */
booksRouter.get('/books',userAuthenticate, booksController.allDownBooks);

module.exports = {booksRouter}