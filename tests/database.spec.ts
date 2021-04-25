import 'mocha';
import {expect} from 'chai';
import {Nota} from '../src/nota';
import {DataBase} from '../src/database';

describe('Clase DataBase', () => {

    let Nota1: Nota = new Nota("Test", "Nota de Prueba", "green");
    let DB: DataBase = new DataBase("Tester",Nota1);

    it("Crea un Objeto DataBase" , () => {
        expect(DB instanceof DataBase).to.eql(true);
    });
    it("Funcion add" , () => {
        expect(DB.add()).to.eql(true);
    });
    it("Funcion list" , () => {
        expect(DB.list()).to.eql(true);
    });
    it("Funcion read" , () => {
        expect(DB.read()).to.eql(true);
    });
    it("Funcion modify" , () => {
        expect(DB.modify()).to.eql(true);
    });
    it("Funcion remove" , () => {
        expect(DB.remove()).to.eql(true);
    });
});