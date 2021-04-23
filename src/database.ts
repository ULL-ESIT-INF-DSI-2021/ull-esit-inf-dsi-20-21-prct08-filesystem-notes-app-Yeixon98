import { Nota } from "./nota";
// import * as chalk from 'chalk';

    const chalk = require('chalk'); 
    const low = require('lowdb');
    const FileSync = require('lowdb/adapters/FileSync');
    const adapter = new FileSync('./src/database/notes.json');
    const db = low(adapter);  

    // console.log(chalk.blue('This text is blue');

export class DataBase{
    constructor(private author: string, private note: Nota){}

    check_author(): boolean{
        let flag: boolean = false
        if(db.get("Users").find({name: this.author}).value()){
            flag = true;
        }
        return flag;
    }

    add(){
        db.defaults({Users: []})
        .write()
        
        if(!this.check_author()){
            db.get("Users")
            .push({name: this.author, Notes: []})
            .write()
        }

        db.get("Users").find({name: this.author}).get("Notes")
            .push({title: this.note.get_title(), content: this.note.get_content(), color: this.note.get_color()})
            .write()
    }

    list(){
        
        if(this.check_author()){
            let sz: number = db.get('Users').find({name: this.author}).get("Notes").size().value();
            for (let i = 0; i < sz; i++) {
                let title: string = db.get('Users').find({name: this.author}).get(`Notes[${i}].title`).value();
                // let content = db.get('Users').find({name: this.author}).get(`notes[${i}].Body`).value();
                let color: string = db.get('Users').find({name: this.author}).get(`Notes[${i}].color`).value();
                this.print_list(i+1, title, color);
            }
        }
        else{
            console.log("Autor no encontrado")
        }
    }

    private print_list(index: number, title: string, color: string){
        switch (color) {
            // "red", "blue", "yellow", "green"
            case "red":
                console.log(index + " " + chalk.red(title));
            break;
            case "blue":
                console.log(index + " " + chalk.blue(title));
            break;
            case "yellow":
                console.log(index + " " + chalk.yellow(title));
            break;
            case "green":
                console.log(index + " " + chalk.green(title));
            break;
        }
    }
}