const booksManager = require('../services/books_services');

/* Agregar un libro */
async function addBook(req, res, next){
    try {
        const {isbn, title, autor, publish_year, library_Id} = req.body;

        const book = await booksManager.createdBook(isbn, title, autor, publish_year, library_Id);
    
        res.status(201).send(book);
    } catch (error) {
        next(error);
    }

}

/* Obtener un libro en particular */
async function theBook(req, res, next){
    try {
        const {id} = req.params;

        const book = await booksManager.oneBook(id);
    
        res.status(200).send(book);
    } catch (error) {
        next(error);
    }
}

/* Obtener todos los libros */
async function takeAllBooks(req, res, next){
    try {
        const books = await booksManager.takeAll();

        res.status(200).send(books);
    } catch (error) {
        next(error);
    }
}

/* Obtener todos los libros dados de baja */
async function allDownBooks(req, res, next){
    try {
        const books = await booksManager.takeAll();

        res.status(200).send(books);
    } catch (error) {
        next(error);
    }
}

/* Modificar un libro */
async function modifyBook(req, res, next){
    try {
        const {id} = req.params;
        const {isbn, title, autor, publish_year, library_Id, is_deleted} = req.body;
    
        const book = await booksManager.editBook(id, isbn, title, autor, publish_year, library_Id, is_deleted);
    
        res.status(201).send(book);
    } catch (error) {
        next(error)
    }
}

/* Eliminar un libro */
async function removeBook(req, res, next){
    try {
        const {id} = req.params;

        await booksManager.deleteBook(id);
    
        res.status(200).send("Libro eliminado exitosamente");
    } catch (error) {
        next(error);
    }
}


module.exports = {takeAllBooks, addBook, theBook, modifyBook, removeBook, allDownBooks}