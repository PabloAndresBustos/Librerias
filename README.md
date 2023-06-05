[¿PORQUE?](why.md)

<div style="display: flex; flex-direction: column; align-items: center;">
<img src="https://drive.google.com/uc?export=view&id=1QdVq3T3Ab1LW68y3YzaZ5LyemsJ0glon" style="border-radius: 30%; margin-bottom: 3rem; border: 1px solid black">
</div>
<div style="text-align: center">
    <h1 style="color: black; text-decoration: underline">Ejercicio 6<h1>
    <h2 style="color: black; text-decoration: underline; margin-bottom: 2rem"> NODE.JS<h2>
</div>
<h2 style="text-align: center; color: black">Enunciado</h2>
    <p style="text-align: left; color: black">Se requiere una API REST que permita manejar librerías y los libros asociados a cada una de las librerías. Utilizar Node.Js Express, Sequelize y Passport como la infraestructura para crear
    el servicio.</p>
    <h2 style="text-align: center; color: black">Libreria</h2>
    <ul style="text-align: left; color: black">
        <li><strong>Descripción:</strong> Una librería puede tener desde 0 a muchos libros.</li>
        <li><strong>Ruta: /library</strong></li>
        <li><strong>Acciones</strong></li>
        <ul>
            <li><strong>Crear librería (AUTH)</strong></li>
            <li><strong>Obtener una librería: </strong>Debe traer también todos los libros</li>
            <li><strong>Obtener todas las librerías</strong></li>
            <li><strong>Modificar una librería (AUTH)</strong></li>
            <li><strong>Eliminar una librería (**) (AUTH)</strong></li>
            <li><strong>Agregar un libro nuevo (*) (AUTH)</strong></li>
        </ul>
    </ul>
    <h1 style="color: black"><strong>Entidad</strong></h1>
    <img >
    <br>
        <img src="https://drive.google.com/uc?export=view&id=1yiNiYkZjf0x5Mwuwme01Pw7nlgtXQ4p_">
    <br>
    <br>
    <br>
    <h2 style="text-align: center; color: black">Libro</h2>
    <ul style="text-align: left; color: black">
        <li><strong>Descripción:</strong> Un libro tiene todos los datos del mismo, puede pertenecer a una librería
        o no y representan la instancia (copia) de un libro. Puede haber más de un libro con los
        mismos datos, excepto el id que es único para esa instancia.</li>
        <li><strong>Ruta: /book</strong></li>
        <li><strong>Acciones</strong></li>
        <ul>
            <li><strong>Crear libro (*) (AUTH)</strong></li>
            <li><strong>Obtener un libro en particular</strong></li>
            <li><strong>Obtener todos los libros</strong></li>
            <li><strong>Modificar un libro (AUTH)</strong></li>
            <li><strong>Eliminar un libro (**) (AUTH)</strong></li>
        </ul>
    </ul>
    <h1 style="color: black"><strong>Entidad</strong></h1>
            <img src="https://drive.google.com/uc?export=view&id=1aY__zGPRoi6L2MWMi4s54cMlcLHmMVdZ">
            <br>
            <br>
            <br>
            <h2 style="text-align: center; color: black">(*): Para crear un libro, pueden hacerlo de las dos formas:</h2>
        <ul style="text-align: left; color: black">
            <li>Haciendo que la librería tenga un método para agregar un libro nuevo</li>
            <li>Crear un libro directamente con /book y enviar el id de la librería</li>
        </ul>
                <h2 style="text-align: center; color: black">(**) El borrado, siempre de forma lógica. Esto quiere decir que no borramos de la base de
                datos si no que marcamos que fué borrado</h2>
    <br>
    <br>
    <h2 style="text-align: center; color: black">Usuario</h2>
    <ul style="text-align: left; color: black">
        <li><strong>Descripción:</strong> Un usuario del sistema. Estos usuarios van a ser creados en la base de
        datos cuando se inicia el sistema.</li>
        <li><strong>Ruta: /user</strong></li>
        <li><strong>Acciones</strong></li>
        <ul>
            <li><strong>Login</strong></li>
        </ul>
        <li><strong>Entidad (A definir)</strong></li>
    </ul>
    <p style="text-align: center; color: black"> Debe existir un usuario con name: <strong>admin</strong> y password: <strong>admin</strong></p>
    <h3 style="text-align: center; color: black">Puntos a evaluar:</h3>
        <ul style="text-align: left; color: black">
            <li>Que la API permite hacer un CRUD de librerías</li>
            <li>Que la API permite hacer un CRUD de libros</li>
            <li>Que las acciones marcadas con (AUTH) sólo se puedan ejecutar si el usuario está
            autenticado</li>
            <li>Definir y crear la entidad de Usuario</li>
            <li>Describir el proceso de desarrollo. (Cómo fueron fueron creados los archivos y por qué)</li>
            <li><strong>Bonus:</strong> Que haya validación de las entidades al momento de crearse/actualizarse</li>
        </ul>
        <h1 style="color: black; text-decoration: underline">¿Por que?</h1>
<div style="text-align: center; font-size: 24px">
    <h1 style="text-decoration: underline; color: black; margin-top: 10rem">Profesor</h1>
</div>
<div style="display: flex; align-items: center; justify-content: space-around">
    <div style="display: flex; flex-direction: column; align-items: center; color: black">
        <img src="https://drive.google.com/uc?export=view&id=1qDQB7U_KiElvyW_UH66G-qLPFOyFGLm-" style="border-radius: 50%; width: 250px; border: 3px solid black; float: left">
        <p style="font-size: 24px">Tamashiro</p>
    </div>
</div>