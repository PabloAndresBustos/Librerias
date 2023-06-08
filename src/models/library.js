const { Model, DataTypes } = require("sequelize");
const { libraries_db } = require("../db/libraries_db");

class Library extends Model {}

Library.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    is_deleted: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: libraries_db,
    modelName: "libraries",
    createdAt: false,
    updatedAt: false,
  }
);


module.exports = { Library };
