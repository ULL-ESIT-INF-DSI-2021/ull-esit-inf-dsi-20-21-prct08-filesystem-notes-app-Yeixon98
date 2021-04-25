/**
 * # Clase Nota
 * Es la encargara gestionar la estructura y componentes de cada nota.
 * 
 * ## Atributos
 * @param title
 * Contiene el titulo de la nota
 * @param content
 * Contiene el mensaje de la nota
 * @param color
 * Contiene el color de la nota
 * 
 * ## Metodos
 * Getters basico de las clases y una comprobaciond el color
 * @method get_title() Devulve el titulo de la nota
 * @method get_content() Devulve el mensaje de la nota
 * @method get_color() Devulve el color de la nota
 * @method checkColor() Comprueba si el color es valido
 */
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