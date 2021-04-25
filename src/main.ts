
import * as yargs from 'yargs';
import { DataBase } from './database';
import { Nota } from './nota';

/**
 * # Archivo main
 * 
 * Es el encargado de la ejecucion del programa,
 * para ello usamos la libreria yargs, que nos 
 * permite controlar los argumentos a la hora 
 * de la ejecucion del programa
 * 
 * Ejemplo -> node dist/main.js add --author="Pedro" --title="Compra" --content="Arroz" --color="red" 
 * 
 * Para este ejemplo, el add, es necesario los argumentos author, title, content, color,
 * ya que estos se usaran para crear una nueva nota y añadirla en caso de que no exista.
 * Cuando se invoca el comando, creamos un objeto Nota con los atributos title, content, color.
 * Luego un objeto DataBase con el author y la Nota creada y llamamos al metodo add de DataBase.
 * 
 * Esto mismo ocurre con el resto de comandos, que necesitan ciertos argumentos,
 * como modify, remove, list, read.
 */

export class main{};

yargs.command({
  command: 'modify',
  describe: 'Modify note of the user',
  builder: {
    author: {
        describe: 'Note author',
        demandOption: true,
        type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    content: {
      describe: 'Note content',
      demandOption: true,
      type: 'string',
    },
  },

  handler(argv) {
    if ((typeof argv.author === 'string') && (typeof argv.title === 'string') && (typeof argv.content === 'string')) {
        let Nota_: Nota = new Nota(argv.title, argv.content, "blue");
        let BD: DataBase = new DataBase(argv.author, Nota_);
        BD.modify();
    }
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove note of the user',
  builder: {
    author: {
        describe: 'Note author',
        demandOption: true,
        type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },

  handler(argv) {
    if ((typeof argv.author === 'string') && (typeof argv.title === 'string')) {
        let Nota_: Nota = new Nota(argv.title, "", "red");
        let BD: DataBase = new DataBase(argv.author, Nota_);
        BD.remove();
    }
  },
});

yargs.command({
  command: 'read',
  describe: 'Read note of the user',
  builder: {
    author: {
        describe: 'Note author',
        demandOption: true,
        type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },

  handler(argv) {
    if ((typeof argv.author === 'string') && (typeof argv.title === 'string')) {
        let Nota_: Nota = new Nota(argv.title, "", "blue");
        let BD: DataBase = new DataBase(argv.author, Nota_);
        BD.read();
    }
  },
});

yargs.command({
    command: 'list',
    describe: 'List note of the user',
    builder: {
      author: {
          describe: 'Note author',
          demandOption: true,
          type: 'string',
      },
    },
  
    handler(argv) {
      if (typeof argv.author === 'string') {
          let Nota_: Nota = new Nota("", "", "blue");
          let BD: DataBase = new DataBase(argv.author, Nota_);
          BD.list();
      }
    },
});

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    author: {
        describe: 'Note author',
        demandOption: true,
        type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    content: {
        describe: 'Note content',
        demandOption: true,
        type: 'string',
    },
    color: {
        describe: 'Note color',
        demandOption: true,
        type: 'string',
    },
  },

  handler(argv) {
    if ((typeof argv.title === 'string') && (typeof argv.content === 'string') && (typeof argv.color === 'string') && (typeof argv.author === 'string')) {
        let Nota_: Nota = new Nota(argv.title, argv.content, argv.color);
        let BD: DataBase = new DataBase(argv.author, Nota_);
        BD.add();
    }
  },
});
yargs.parse();