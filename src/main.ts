
import * as yargs from 'yargs';
import { DataBase } from './database';
import { Nota } from './nota';

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
          let BD_list: DataBase = new DataBase(argv.author, Nota_);
          BD_list.list();
      }
    },
}).parse();

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
        let BD_add: DataBase = new DataBase(argv.author, Nota_);
        BD_add.add();
    }
  },
}).parse();
