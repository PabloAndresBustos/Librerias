const {Model, DataTypes} = require('sequelize');
const { libraries_db } = require('../db/libraries_db');

class Users extends Model{

}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: libraries_db,
    modelName: 'user',
    createdAt: false,
    updatedAt: false
    
});

module.exports = {Users}