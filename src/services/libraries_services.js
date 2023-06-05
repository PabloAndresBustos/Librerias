const { Books } = require("../models/books");
const { Library } = require("../models/library");
const { createdBook } = require("./books_services");
const {
  parameterByBody,
  parameterByParams,
} = require("../validations/validation_parameters");

/* Buscar una libreria */
/* Esta funcion se utiliza en la funcion registerLibrary es solo de uso interno, no posee ruta. 
Cabe aclarar que mi idea con esta funcion es evitar las librerias duplicadas en todo caso se puede
colocar el mismo nombre + Sucursal x */
async function this_library(name) {
  /* Buscamos las bibliotecas que no esten dadas de baja en la base de datos y que tengan el mismo nombre */
  const library = await Library.findOne({
    where: {
      name: name,
    },
  });
  /* En caso de que no traiga ninguna biblioteca retornaremos true */
  if (!library) {
    return true;
  } else {
    /* Si la libreria exista y esta dada de baja, dado que el usuria es admin
        damos la posibilidad de cambiar el estado de esa libreria par poder darla de alta */
    if (library.is_deleted == "yes") {
      console.log(
        "Puede dar de alta una libraria dada de baja modificando el valor is_deleted"
      );
      throw new Error(
        "La librebria esta en la base de datos dada de baja dirigase a library/down_libraries para verificarla"
      );
    } else {
      /* Caso contrari devolvemos el nombre  */
      const libraryName = library.name;
      return libraryName;
    }
  }
}

/* Registar una nueva libreria */
async function registerLibrary(name, location, phone) {
  parameterByBody(name, "string");
  parameterByBody(location, "string");
  parameterByBody(phone, "string");

  /* Verificamos si la libreria ya se encuentra en la base de datos */
  const thisLibrary = await this_library(name);

  /* Si no hay librerias con el mismo nombre procedemos con la crecion de una nueva.  */
  if (thisLibrary !== name) {
    const library = new Library();

    library.name = name;
    library.location = location;
    library.phone = phone;

    const newLibrary = await library.save();

    return newLibrary;
  } else {
    /* Si el nombre de la liberia es la misma, indicamos que la libreria ya esta creada */
    console.log("No se puede crear 2 veces la misma biblioteca");
    throw new Error("La librerira ya se encuentra en al base de datos");
  }
}

/* Obtener una libreria con todos sus libros */
async function getLibrary(id) {
  parameterByParams(id);
  /* Creamos un objeto vacio donde guardaremos los resultados */
  const booksOnLibrary = {};
  /* Buscamos la libreria por id */
  const library = await Library.findOne({
    where: {
      id: id,
      is_deleted: "no",
    },
  });

  console.log(library);

  /* Al obtener la libreria la agregamos al objeto creado junto con los libros */
  if (library) {
    /* Buscamos todos los libros cuya realacion con la libria sea igual al id de la libreria */
    const books = await Books.findAll({
      where: {
        library_id: id,
      },
    });
    booksOnLibrary.library = library;
    booksOnLibrary.books = books;

    return booksOnLibrary;
  } else {
    /* Si no encontramos libreria, la libreria no existe */
    throw new Error("La libreria no existe");
  }
  s;
}

/* Obterner todas las librerias */
async function takeAll() {
  /* Buscamos todas la librerias que no esten eliminadas. */
  const libraries = await Library.findAll({
    where: {
      is_deleted: "no",
    },
  });

  /* Si no encontramos librerias asumimos problemas de conexion. */
  if (!libraries) {
    throw new Error("Error con la conexion a la base de datos");
  } else {
    return libraries;
  }
}

/* Obtener todas las librerias dadas de baja */
async function allDown() {
  /* Buscamos todas la librerias que esten eliminadas. */
  const libraries = await Library.findAll({
    where: {
      is_deleted: "yes",
    },
  });

  if (!libraries) {
    /* Si no encontramos librerias asumimos problemas de conexion. */
    throw new Error("Error con la conexion a la base de datos");
  } else {
    return libraries;
  }
}

/* Modificar librerias */
async function editLibrary(id, name, location, phone, is_deleted) {
  parameterByParams(id);

  /* Buscamos la libreria por Id */
  const library = await Library.findByPk(id);

  if (library) {
    /* Si se ingresaron alguno de estos parametros se modificaran */
    if (name !== undefined) {
      parameterByBody(name, "string");
      library.name = name;
    }
    if (location !== undefined) {
      parameterByBody(location, "string");
      library.location = location;
    }
    if (phone !== undefined) {
      parameterByBody(phone, "string");
      library.phone = phone;
    }
    if (is_deleted !== undefined) {
      parameterByBody(is_deleted, "string");
      library.is_deleted = is_deleted;
    }

    const library_edited = await library.save();

    return library_edited;
  } else {
    /* En caso de no encontrar librarias */
    throw new Error("La libreria no existe");
  }
}

/* Eliminar una libreria */
async function deletedLibrary(id) {
  parameterByParams(id);

  /* Seleccionamos la libreria con todos sus libros */
  const selectLibrary = await getLibrary(id);

  /* Si obtenemos libreria */
  if (selectLibrary) {
    /* Dejamos sin asignacion de libreria los libros que estaban asociados a esta */
    for (i = 0; i < selectLibrary.books.length; i++) {
      selectLibrary.books[i].library_id = null;
      await selectLibrary.books[i].save();
    }
    /* Luego dejamos marcada la libreria como eliminada */
    selectLibrary.library.is_deleted = "yes";
    selectLibrary.library.save();
  } else {
    throw new Error("La libreria saleccionada no existe en la base de datos.");
  }
}

/* Agregar un libro */
async function addBook(id, isbn, title, autor, publish_year) {
  parameterByParams(id);

  const libraryBooks = await getLibrary(id);

  /* Importado desde books_services */
  /* Se crea el libro a agregar a la libreria con la funcion createdBook, pero en el parametro de library_id
    ingresamos el id que recibimos por parametro para dejarlo directamente asociado a la libreria */
  await createdBook(isbn, title, autor, publish_year, id);

  if (libraryBooks) {
    /* Retornamos la libreria con todos lo libros donde se vera agreado el nuevo. */
    return libraryBooks;
  } else {
    throw new Error("El libro no se agrego");
  }
}

module.exports = {
  takeAll,
  registerLibrary,
  getLibrary,
  editLibrary,
  deletedLibrary,
  addBook,
  allDown,
};
