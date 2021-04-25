
export class Nota{
    constructor(private title: string, private content: string, private color: string){
        this.checkColor();
    }

    get_title():string {
        return this.title;
    }
    get_content(): string {
        return this.content;
    }

    get_color():string { 
        return this.color;
    }

    checkColor() {
        let flag: boolean = true;
        let paletadecolores: string[] = ["red", "blue", "yellow", "green"];
        if(paletadecolores.find(x => x === this.color) === undefined){
            console.log("Color Invalido");
            console.log("Valor seteado al predeterminado");
            this.color= "blue";
            flag = false;
        }
        return flag;
    }
}