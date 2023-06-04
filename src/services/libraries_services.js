const { Books } = require('../models/books');
const {Library} = require('../models/library');
const { createdBook } = require('./books_services');
const {parameterByBody, parameterByParams} = require('../validaciones/validation_parameters');

/* Buscar una libreria */
async function this_library(name){
    /* Buscamos las bibliotecas que no esten dadas de baja en la base de datos y que tengan el mismo nombre */
    const library = await Library.findOne({
        where: {
            name: name,
        }
    });
    /* En caso de que no traiga ninguna biblioteca retornaremos true, caso contrario solo tomaremos el nombre */
    if(!library){
        return true;
    }else{
        if(library.is_deleted == "yes"){
            console.log("Puede dar de alta una libraria dada de baja modificando el valor is_deleted");
            throw new Error("La librebria esta en la base de datos dada de baja dirigase a library/down_libraries para verificarla")
        }else{
            const libraryName = library.name;
            return libraryName;
        }
    }
}

/* Registar una nueva libreria */
async function registerLibrary(name, location, phone){

        parameterByBody(name, 'string');
        parameterByBody(location, 'string');
        parameterByBody(phone, 'string');

        const thisLibrary = await this_library(name);
        if(thisLibrary != name){
            const library = new Library();
    
            library.name = name
            library.location = location
            library.phone = phone
        
            const newLibrary = await library.save();
        
            return newLibrary;
        }else{
            console.log("No se puede crear 2 veces la misma biblioteca");
            throw new Error("La librerira ya se encuentra en al base de datos");
        }
}

/* Obtener una libreria con todos sus libros */
async function getLibrary(id){
    
    parameterByParams(id);
    
    const booksOnLibrary = {}
    const library = await Library.findByPk(id);
    const books = await Books.findAll({
        where: {
            library_id : id,
            is_deleted: "no"
        }
    });

    if(library){
        booksOnLibrary.library = library;
        booksOnLibrary.books = books;
    
        return booksOnLibrary;
    }else{
        throw new Error("La libreria no existe");
    }
}

/* Obterner todas las librerias */
async function takeAll(){
    
    const libraries = await Library.findAll({
        where: {
            is_deleted: "no"
        }
    });

    if(!libraries){
        throw new Error("Error con la conexion a la base de datos")
    }else{
        return libraries;
    }
   
}

/* Obtener todas las librerias dadas de baja */
async function allDown(){
    
    const libraries = await Library.findAll({
        where: {
            is_deleted: "yes"
        }
    });

    if(!libraries){
        throw new Error("Error con la conexion a la base de datos")
    }else{
        return libraries;
    }
}

/* Modificar librerias */
async function editLibrary(id, name, location, phone, is_deleted){

    parameterByParams(id);
    parameterByBody(name, 'string');
    parameterByBody(location, 'string');
    parameterByBody(phone, 'string');
    parameterByBody(is_deleted, 'string');

    const library = await Library.findByPk(id);

    if(library){
        if(name || location || phone || is_deleted){
            library.name = name
            library.location = location
            library.phone = phone
            library.is_deleted = is_deleted
        }  
    
        const library_edited = await library.save();
    
        return library_edited;
    }else{
        throw new Error("La libreria no existe");
    }
}

/* Eliminar una libreria */
async function deletedLibrary(id){

    parameterByParams(id)
    const library = await Library.findByPk(id);

    if(library){
        library.is_deleted = "yes";

        await library.save();
    }else{
        throw new Error("La libreria no existe");
    }


}

/* Agregar un libro */
async function addBook(id, isbn, title, autor, publish_year){

    parameterByParams(id);
/*     parameterByBody(isbn, 'string');
    parameterByBody(title, 'string');
    parameterByBody(autor, 'string');
    parameterByBody(publish_year, 'string'); */
    
    /* Importado desde books_services */
    await createdBook(isbn, title, autor, publish_year, id);

    const libraryBooks = await getLibrary(id);

    if(libraryBooks){
        return libraryBooks;
    }else{
        throw new Error("El libro no se agrego");
    }
    
    

}

module.exports = {takeAll, registerLibrary, getLibrary, editLibrary, deletedLibrary, addBook, allDown}
