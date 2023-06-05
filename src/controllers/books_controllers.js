const booksManager = require('../services/books_services');

/* Agregar un libro */
async function addBook(req, res, next){
    const {isbn, title, autor, publish_year, library_id} = req.body;
    try {    
        const book = await booksManager.createdBook(isbn, title, autor, publish_year, library_id);
        res.status(201).send(book);
    } catch (error) {
        next(error);
    }

}

/* Obtener un libro en particular */
async function theBook(req, res, next){
    const {id} = req.params;
    try {
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
    const {id} = req.params;
    const {title, autor, publish_year, library_id, is_deleted} = req.body;
    try {  
        const book = await booksManager.editBook(id, title, autor, publish_year, library_id, is_deleted);
        res.status(201).send(book);
    } catch (error) {
        next(error)
    }
}

/* Eliminar un libro */
async function removeBook(req, res, next){
    const {id} = req.params;
    try {
        await booksManager.deleteBook(id);    
        res.status(200).send("Libro eliminado exitosamente");
    } catch (error) {
        next(error);
    }
}


module.exports = {takeAllBooks, addBook, theBook, modifyBook, removeBook, allDownBooks}