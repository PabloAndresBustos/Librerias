/* Modulos importados */
const express = require("express");
const { booksRouter } = require("./src/routes/books_routes");
const { librariesRouter } = require("./src/routes/libraries_routes");
const { userRouter } = require("./src/routes/users_routes");
const { createUser, adminUser } = require("./src/services/users_services");
const { wrongInCode } = require("./src/middlewares/errorManager");
const {
  authenticationStart,
} = require("./src/authenticationJWT/authentication");

/* Passport para validar usuario en las rutas */
authenticationStart();

/* Configuracion del servidor */
const app = express();
const port = 3031;
app.use(express.json());

/* Rutas */
app.use("/library", librariesRouter);
app.use("/book", booksRouter);
app.use("/user", userRouter);

/* Middlewares */
app.use(wrongInCode);

app.listen(port, () => {
  console.log("*********************************************");
  console.log(`El servidor esta online en el puerto: ${port}`);
  console.log("*********************************************");
});

/* El usuario admin debe ser creado cuando se inicia la API */
console.log("**********************");
console.log("Creando usuario admin");
console.log("**********************");
createUser("admin", "admin");
