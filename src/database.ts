import { Nota } from "./nota";
// import * as chalk from "chalk";

    const chalk = require("chalk"); 
    const low = require("lowdb");
    const FileSync = require("lowdb/adapters/FileSync");
    const adapter = new FileSync("./src/database/notes.json");
    const db = low(adapter);  

/**
 * # Clase DataBase
 * Esta clase es la encargada de gestionar el fichero de almacenamiento de las notas,
 * para ello, cuando se llema al constructor se le apsa el autor y la nota.
 * 
 * ## Metodos
 * Es el encargado de comprobar si existe el usuario
 * @method check_author() //Devulve true o false
 * Es el encargado de comprobar si existe la nota
 * @method check_title() //Devulve true o false 
 * El metodo add usa la comprobacion de check_author() para saber si el autor ya esta,
 * en caso de que no, lo crea, si esta lo que hace es comprobar luego con check_title()
 * si ya esta la nota, en caso de que no este la añade
 * @method add()
 * El metodo list() compruba la existencia del autor, y si esta lista 
 * el titulo de todas las notas de este autor.
 * @method list()
 * El metodo read() comprueba si esta el autor y el titulo de la nota, 
 * en caso de que si, muestra el titulo y el contenido
 * @method read()
 * El metodo privado print() se usa para mostrar en consola el contenido que
 * ilustran los otros dos metodos anteriores
 * @method print()
 * El metodo remove() comprueba si existe el autor, luego si existe la nota,
 * en caso de que si, toma el tamaño de las notas, recorre todas las notas 
 * y cuando encuentra la que se quiere eliminar, se hace uso de la funcion remove
 * de lowdb que hay que pasarle el objeto a eliminar, por esto es necesario buscar
 * la nota puesto que para la funcion remove del main solo se le pasa como parametro
 * el autor y el titulo.
 * @method remove()
 * El metodo modificar() realiz las comprobaciones de autor y titulo, en caso de que si
 * este busca esta nota al igual que el remover busca la que quiere borrar, pero en este
 * caso haciendo uso del assign de lowdb podemos modificar el contenido de un campo.
 * @method modify()
 */
export class DataBase{
    constructor(private author: string, private note: Nota){}

    check_author(): boolean{
        let flag: boolean = false;
        if(db.get("Users").find({name: this.author}).value()){
            flag = true;
        }
        return flag;
    }

    check_title(): boolean{
        let flag: boolean = false;
        if(db.get("Users").find({name: this.author}).get("Notes").find({title: this.note.get_title()}).value()){
            flag = true;
        }
        return flag;
    }

    add(){
        db.defaults({Users: []})
            .write();
        
        if(!this.check_author()) {
            db.get("Users")
            .push({name: this.author, Notes: []})
            .write();
        }

        if(!this.check_title()) {
            db.get("Users").find({name: this.author}).get("Notes")
                .push({title: this.note.get_title(), content: this.note.get_content(), color: this.note.get_color()})
                .write();
            console.log(chalk.green("Nota añadida"));
            return true;
        }
        else {
            console.log(chalk.red("La nota ya existe"));
            return false;
        }
    }

    list(){
        
        if(this.check_author()){
            let sz: number = db.get("Users").find({name: this.author}).get("Notes").size().value();
            for (let i = 0; i < sz; i++) {
                let title: string = db.get("Users").find({name: this.author}).get(`Notes[${i}].title`).value();
                let color: string = db.get("Users").find({name: this.author}).get(`Notes[${i}].color`).value();
                this.print(i+1, title, color);
            }
            return true;
        }
        else{
            console.log(chalk.red("Autor no encontrado"));
            return false
        }
    }

    read(){
        if(this.check_author()){
            if(this.check_title()){
                let sz: number = db.get("Users").find({name: this.author}).get("Notes").size().value();
                for (let i = 0; i < sz; i++) {
                    if(db.get("Users").find({name: this.author}).get(`Notes[${i}].title`).value() == this.note.get_title()){
                        let title: string = db.get("Users").find({name: this.author}).get(`Notes[${i}].title`).value();
                        let content = db.get("Users").find({name: this.author}).get(`Notes[${i}].content`).value();
                        let color: string = db.get("Users").find({name: this.author}).get(`Notes[${i}].color`).value();
                        this.print(i+1, title, color, content);
                        break;
                    }
                }
                return true;
            }
            else {
                console.log(chalk.red("Nota no encontrada"));
                return false;
            }
        }
        else{
            console.log(chalk.red("Autor no encontrado"));
            return false;
        }
    }

    private print(index: number, title: string, color: string, content: string = ""){
        console.log(`Nota ${index}:`);
        switch (color) {
            // "red", "blue", "yellow", "green"
            case "red":
                console.log("  Titulo: " + chalk.red(title));
                if(content != "")
                    console.log("  Mensaje: " + chalk.red(content));
            break;
            case "blue":
                console.log("  Titulo: " + chalk.blue(title));
                if(content != "")
                    console.log("  Mensaje: " + chalk.blue(content));
            break;
            case "yellow":
                console.log("  Titulo: " + chalk.yellow(title));
                if(content != "")
                    console.log("  Mensaje: " + chalk.yellow(content));
            break;
            case "green":
                console.log("  Titulo: " + chalk.green(title));
                if(content != "")
                    console.log("  Mensaje: " + chalk.green(content));
            break;
        }
    }

    remove(){
        if(this.check_author()){
            if(this.check_title()){
                let sz: number = db.get("Users").find({name: this.author}).get("Notes").size().value();
                for (let i = 0; i < sz; i++) {
                    if(db.get("Users").find({name: this.author}).get(`Notes[${i}].title`).value() == this.note.get_title()){
                        let title: string = db.get("Users").find({name: this.author}).get(`Notes[${i}].title`).value();
                        let content = db.get("Users").find({name: this.author}).get(`Notes[${i}].content`).value();
                        let color: string = db.get("Users").find({name: this.author}).get(`Notes[${i}].color`).value();
                        db.get("Users").find({name: this.author}).get("Notes")
                            .remove({title: title, content: content, color: color})
                            .write();
                        break;
                    }
                }
                console.log(chalk.green("Nota eliminada"));
                return true;
            }
            else {
                console.log(chalk.red("Nota no encontrada"));
                return false;
            }
        }
        else{
            console.log(chalk.red("Autor no encontrado"));
            return false;
        }
    }

    modify(){
        if(this.check_author()){
            if(this.check_title()){
                let sz: number = db.get("Users").find({name: this.author}).get("Notes").size().value();
                for (let i = 0; i < sz; i++) {
                    if(db.get("Users").find({name: this.author}).get(`Notes[${i}].title`).value() == this.note.get_title()){
                        db.get("Users").find({name: this.author}).get(`Notes[${i}]`)
                            .assign({ content: this.note.get_content() })
                            .value();
                        db.write();
                        break;
                    }
                }
                console.log(chalk.green("Nota modificada"));
                return true;
            }
            else {
                console.log(chalk.red("Nota no encontrada"));
                return false;
            }
        }
        else{
            console.log(chalk.red("Autor no encontrado"));
            return false;
        }
    }
}