const {Books} = require('../models/books');
const {Library} = require('../models/library');
const {parameterByParams, parameterByBody} = require('../validaciones/validation_parameters')

/* Mismo libro */
async function sameBook(isbn){
    const book = await Books.findOne({
        where: {
            isbn: isbn,
        }
    })

    return book;
}

/* Crear un libro */
async function createdBook(isbn, title, autor, publish_year, library_Id){

    parameterByParams(isbn, 'number');
    parameterByBody(title, 'string');
    parameterByBody(autor, 'string');
    parameterByBody(publish_year, 'string');

    const equalBook = await sameBook(isbn);
    
    if(library_Id){
        const existLibrary = await Library.findByPk(library_Id);
        if(!existLibrary){
            throw new Error("La libreria no existe, puede dejarla desaociado o buscar una que exista");
        }
    }         

    if(!equalBook || (equalBook.title === title && equalBook.autor === autor  && equalBook.publish_year === publish_year)){
        const book = new Books();

        book.isbn = isbn
        book.title = title
        book.autor = autor
        book.publish_year = publish_year
        book.library_Id = library_Id
    
        const newBook = await book.save();
    
        return newBook;
    }else{
        throw new Error("El ISBN esta duplicado con datos de otro autor, año de publicacion y/o titulo diferente, verifique el ISBN");
    }
}

/* Obtener un libro en particular */
async function oneBook(id){

    parameterByParams(id);

    const book = await Books.findByPk(id);

    if(book){
        return book;
    }else{
        throw new Error("El libro que buscas no se encuentra en las bibliotecas");
    }

    
}

/* Obtener todos los libros */
async function takeAll(){
    
    const books = await Books.findAll({
        where: {
            is_deleted: "no"
        }
    });

    if(books){
        return books;
    }else{
        throw new Error("Error en la conexion con la base de datos");
    }
}

/* Traer todos los libros dados de baja */
async function downBooks(){
    
    const books = await Books.findAll({
        where: {
            is_deleted: "yes"
        }
    });

    if(books){
        return books;
    }else{
        throw new Error("Error en la conexion con la base de datos");
    }
}

/* Modificar un libro */
async function editBook(id, isbn, title, autor, publish_year, library_Id){

    parameterByParams(id, 'number');
    parameterByBody(isbn, 'string');
    parameterByBody(title, 'string');
    parameterByBody(autor, 'string');
    parameterByBody(publish_year, 'string');

    const book = await oneBook(id)

    if(book){
        if (isbn || title || autor || publish_year || library_Id){
            book.isbn = isbn
            book.title = title
            book.autor = autor
            book.publish_year = publish_year
            book.library_Id = library_Id
        }
    
        const book_edited = await book.save();
    
        return book_edited;
    }else{
        throw new Error("El libro que buscas no se encuentra en la base de datos.");
    }


}

/* Eliminar un libro */
async function deleteBook(id){

    parameterByParams(id);

    const book = await Books.findByPk(id);

    if(book){
        book.is_deleted = "yes";

        await book.save();
    }else{
        throw new Error("")
    }
}


module.exports = {takeAll, createdBook, oneBook, editBook, deleteBook, downBooks}