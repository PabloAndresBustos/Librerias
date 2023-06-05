const {Books} = require('../models/books');
const {Library} = require('../models/library');
const {parameterByParams, parameterByBody} = require('../validations/validation_parameters')

/* Mismo libro */
async function sameBook(isbn){
    const book = await Books.findOne({
        where: {
            isbn: isbn
        }
    })
    return book;
}

/* Crear un libro */
async function createdBook(isbn, title, autor, publish_year, library_id){

    parameterByParams(isbn, 'number');
    parameterByBody(title, 'string');
    parameterByBody(autor, 'string');
    parameterByBody(publish_year, 'string');

    /* Buscaremos por medio del ISBN si existe algun libro */
    const equalBook = await sameBook(isbn);  
    
    /* Si se nos brinda el ID de la libraria dejaremos el nuevo libro asociado a esa libreria. */
    if(library_id !== undefined){
        parameterByParams(library_id);
        const existLibrary = await Library.findOne({
            where: {
                id: library_id,
                is_deleted: "no"
            }
        });
        /* Si el ID de la libreria no existe se brinda informacion. */
        if(!existLibrary){
            throw new Error("La libreria no existe, puede dejarla desaociado o buscar una que exista");
        }
    }

    /* Si no hay libro registrado con el mismo ISBN el libro se creara. Si el ISBN es igual comprobamos 
    el titulo, autor y año de publicacion, con estos datos vemos que es el mismo libro. En ese caso crearemos
    el libro, encaso de que alguno de estos datos se diferente informamos que el ISBN es de otro libro */
    if(!equalBook || (equalBook.title === title && equalBook.autor === autor  && equalBook.publish_year === publish_year)){
        const book = new Books();

        book.isbn = isbn
        book.title = title
        book.autor = autor
        book.publish_year = publish_year
        book.library_id = library_id
    
        const newBook = await book.save();
    
        return newBook;
    }else{
        throw new Error("El ISBN esta duplicado con datos de otro autor, año de publicacion y/o titulo diferente, verifique el ISBN");
    }
}

/* Obtener un libro en particular */
async function oneBook(id){

    parameterByParams(id);

    /* Buscamos el libro por medio del id */
    const book = await Books.findOne({
        where: {
            id: id,
            is_deleted: "no"
        }
    });

    if(book){
        /* Si lo encontramos lo mostramos */
        return book;
    }else{
        /* Caso contrario indicamos que le libro no esta en la base de datos. */
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
async function editBook(id, title, autor, publish_year, is_deleted, library_id){

    parameterByParams(id, 'number');
    
    const book = await oneBook(id)
    /* Si encuentro un libro en la base de datos y se nos brinda alguno de los datos para modificar lo midicamos 
    permito modificar el parametro is_deleted ya que el usuario es admin poder dar de alta un libro, esto en caso
    de una devoluvion por ejemplo*/
    if(book){
        if (title !== undefined){
            parameterByBody(title, 'string');
            book.title = title;
        }
        if (autor !== undefined){
            parameterByBody(autor, 'string');
            book.autor = autor;
        }
        if (publish_year !== undefined){
            parameterByBody(publish_year, 'string');
            book.publish_year = publish_year;
        }
        if (is_deleted !== undefined){
            parameterByBody(is_deleted, 'string');
            book.is_deleted = is_deleted;
        }
        if (library_id !== undefined){
            parameterByBody(library_id, 'string');
            book.library_id = library_id;
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
        throw new Error("El libro que desea eliminar no esta en la base de datos.")
    }
}


module.exports = {takeAll, createdBook, oneBook, editBook, deleteBook, downBooks}