# Informe Practica 8

<p align="center">
    <a href="https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-Yeixon98/actions/workflows/node.js.yml">
        <img alt="GitHub Tests" src="https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-Yeixon98/actions/workflows/node.js.yml/badge.svg?branch=master">
    </a>  
    <a href="https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-Yeixon98/actions/workflows/sonar-cloud.yml">
        <img alt="Sonar-Cloud Status" src="https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-Yeixon98/actions/workflows/sonar-cloud.yml/badge.svg?branch=master">
    </a>
    <a href="https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-Yeixon98/actions/workflows/coveralls.yml">
        <img alt="Coveralls" src="https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct08-filesystem-notes-app-Yeixon98/actions/workflows/coveralls.yml/badge.svg?branch=master">
    </a>
</p>

## Procesamiento de notas de texto
1. La aplicación de notas deberá permitir que múltiples usuarios interactúen con ella, pero no simultáneamente.
2. Una nota estará formada, como mínimo, por un título, un mensaje y un color (rojo, verde, azul o amarillo).
3. Cada usuario tendrá su propia lista de notas, con la que podrá llevar a cabo las siguientes operaciones: 
    * Añadir
    * Eliminar
    * Modificar
    * Listar los titulos
    * Leer
4. Un usuario solo puede interactuar con la aplicación de procesamiento de notas de texto a través de la línea de comandos. Los diferentes comandos, opciones de los mismos, así como manejadores asociados a cada uno de ellos deben gestionarse mediante el uso del paquete yargs.

## Funcionamiento del programa

El programa funciona de la siguiente forma, a la hora de la ejecucion se usa uno de los metodos que se implementaron con yargs, ya sea add, modify, remove, list, read, con sus respectivos argumentos.
Ejemplo de uso:

## add

```bash
node dist/main.js add --user="Pedro" --title="Titulo" --content="Mensaje" --color="blue"
```

Para añadir una nota, tenemos que pasar por argumentos el usuario, el titulo, el mensaje y el color de la nota.

## list

```bash
node dist/main.js list --user="Pedro"
```

Para listar los titulos de las notas, tenemos que pasar por argumentos el usuario al cual pertenecen las notas.

## read

```bash
node dist/main.js read --user="Pedro" --title="Titulo"
```

Para leer una nota, tenemos que pasar por argumentos el usuario y el titulo de la nota a leer.

## remove

```bash
node dist/main.js remove --user="Pedro" --title="Titulo"
```

Para eliminar una nota, tenemos que pasar por argumentos el usuario y el titulo de la nota a eliminar.

## modify

```bash
node dist/main.js modify --user="Pedro" --title="Titulo" --content="Mensaje"
```

Para modificar una nota, tenemos que pasar por argumentos el usuario, el titulo y el nuevo mensaje de la nota que se vaya a modificar.

---
Todo lo que se ejecute en el programa afectara a la base de datos, que se encuentra en el directorio ```src/database``` como ```users.json```.