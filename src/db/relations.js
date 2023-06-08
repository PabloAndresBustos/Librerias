const { Books } = require("../models/books");
const { Library } = require("../models/library");

Books.belongsTo(Library, {foreignKey: 'id'})

Library.hasMany(Books, {foreignKey: 'library_id', as: "BooksOnLibrary"})