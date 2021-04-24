import { Nota } from "./nota";
// import * as chalk from "chalk";

    const chalk = require("chalk"); 
    const low = require("lowdb");
    const FileSync = require("lowdb/adapters/FileSync");
    const adapter = new FileSync("./src/database/notes.json");
    const db = low(adapter);  

    // console.log(chalk.blue("This text is blue");

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
        }
        else {
            console.log(chalk.red("La nota ya existe"));
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
        }
        else{
            console.log(chalk.red("Autor no encontrado"));
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
            }
            else {
                console.log(chalk.red("Nota no encontrada"));
            }
        }
        else{
            console.log(chalk.red("Autor no encontrado"));
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
            }
            else {
                console.log(chalk.red("Nota no encontrada"));
            }
        }
        else{
            console.log(chalk.red("Autor no encontrado"));
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
            }
            else {
                console.log(chalk.red("Nota no encontrada"));
            }
        }
        else{
            console.log(chalk.red("Autor no encontrado"));
        }
    }
}