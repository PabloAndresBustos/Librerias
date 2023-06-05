const {Sequelize} = require('sequelize');

const libraries_db = new Sequelize({
    host: "bdphaylwsnlbt55jud5h-mysql.services.clever-cloud.com",
    database: "bdphaylwsnlbt55jud5h",
    username: "u3ik00xue3pd4ogp",
    password: "KUypNeTIXjGwVkAPaHXY",
    port: 3306,
    dialect: "mysql"
});

module.exports = {libraries_db}