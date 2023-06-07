Realizamos una estructura de carpetas por convencion y buena practica, Es mas legible saber de que se trata cada funcion alojada en cada carpeta si nos guiamos por el nombre de la misma y por los comentarios dejados de manera interna, en el codigo. 

El ISBN es un codigo unico, pero no para cada libro en el mundo, si no que 2 o mas libros del mismo author, edicion, editorial y año, pueden tener el mismo ISBN, dejando en claro que en ese caso los libros seran exactamente iguales. Esto se puede verificar en las librerias, al tomar 2 libro iguales, tendran el mismo ISBN.

Es por esto mismo que decidi tomar este parametro de una forma particular, Se podran crear libros con el mismo ISBN, siempre que el autor, año y titulo(a falta de editorial), sean iguales, esto lo veo util en caso de tener que manejar stcok de libros. En caso de colocar un ISBN ya existente en la base de datos con alguno de estos datos diferentes, el libro on se creara, por lo que se debera cambiar el ISBN. 

Al eliminar las librerias se desasociaran los libros a ella, dejando el valor de libarary_id, en null para poder modificarlo.

Por el simple echo de llamarse admin, considero que el usuario tiene privilegios en el sistema, por esto decidi que el usuario pueda dar de alta bibliotecas elimadas. 
	Asi tambien decidi darle la posibilidad de dar de alta libros eliminados, por si el un “cliente de una libreria decide devolver el libro”

Como el usuario puede dar de alta librerias y libros, se agrego la ruta para acceder a los elementos dados de baja, para asi tomar los datos y poder modificarlos. 

Agregamos 2 funciones que permitiran comprobar el tipo y valor de los parametros ingresados tanto el cuerpo como en la URL, Esto hara que si el usuario ingresa un valor incorrecto, por ejemplo nua letra, en el parms el mismo no sera valido e informaremos que el valor debe ser del tipo numero. 

El usuario en efecto se creara al inicar la API, pero el valor contraseña se encuentra encriptado por medio de bcrypt.

La base de datos es online por medio de https://www.clever-cloud.com/ Encontraran los datos para acceder a la Base de datos en el mismo codigo. Aun asi dejamos los .sql para poder crear la misma de manera local. 

[<== Volver](README.md)