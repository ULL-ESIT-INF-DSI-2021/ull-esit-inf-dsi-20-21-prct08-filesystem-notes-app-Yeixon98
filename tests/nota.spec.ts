import 'mocha';
import {expect} from 'chai';
import {Nota} from '../src/nota';

describe('Clase Nota', () => {

    let Nota1: Nota = new Nota("Test", "Nota de Prueba", "green");

    it("Crea un Objeto Nota" , () => {
        expect(Nota1 instanceof Nota).to.eql(true);
    });
    it("get_title" , () => {
        expect(Nota1.get_title()).to.eql("Test");
    });
    it("get_content" , () => {
        expect(Nota1.get_content()).to.eql("Nota de Prueba");
    });
    it("get_color" , () => {
        expect(Nota1.get_color()).to.eql("green");
    });
    it("check color" , () => {
        expect(Nota1.checkColor()).to.eql(true);
    });
});