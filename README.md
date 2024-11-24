# backend_III_entregaFinal

API ADOPTION

Autor: Conturso, Pablo
Fecha: Noviembre, 2024

DESCRIPCION
API REST elaborada en el marco de la carrera Desarrollo Web Fullstack de Coderhouse, para el módulo Programación Backend III: Testing y Escalabilidad Backend.

DOCUMENTACION

Accecsible desde la direccion http://localhost:8080/api-docs. 
Utilizando SWAGGER UI permite a los usuarios probar los diferentes endpoints.

INICIALIZACION DE LA API

Mediante los comandos:
npm run start
npm run dev

TESTEO DE FUNCIONALIDADES

Mediante comando:
npm run test

Una vez inicializado el comando, se probaran las funcionalidades de la API REST. Las mismas se poseen la estructura basica de un CRUD.

CRUD "Pets":
Prueba el endpoint para buscar todas las mascotas
Crea una mascota
Busca a la mascota por el Id
Modifica la mascota y verifica que las modificaciones
Elimina la mascota

CRUD "Users":
Prueba el endpoint para buscar todos los usuarios
Crea un usuario
Busca el usuario por el Id
Modifica el usuario y verifica que las modificaciones
Elimina el usuario

CRUD "Adoptions":
Crea una mascota
Crea un usuario
Crea una adopción con el usuario y la mascota creados anteriormente
Comprueba que se haya modificado el usuario
Comprueba que se haya modificado la mascota
Busca la adopción por el Id
Elimina la adopción creada
Comprueba que al eliminar la adopción se modifique el usuario
Comprueba que al eliminar la adopción se modifique la mascota
Elimina la mascota
Elimina el usuario

VARIABLES DE ENTORNO

Se adjunta archivo ".example.env" con las variables a completar para el correcto funcionamiento.

ENLACE

Github: https://github.com/MC-Pablo/backendIII_final.git

