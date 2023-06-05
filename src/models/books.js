const { Model, DataTypes } = require("sequelize");
const { libraries_db } = require("../db/libraries_db");

class Books extends Model {}

Books.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    isbn: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    autor: {
      type: DataTypes.STRING,
    },
    publish_year: {
      type: DataTypes.STRING,
    },
    library_id: {
      type: DataTypes.INTEGER,
    },
    is_deleted: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: libraries_db,
    modelName: "books",
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = { Books };
