
import { Tema } from "./Tema";
import { Usuario } from "./Usuario";

export class Postagem{ 
    public curtidos:number;
    public id:number;  
    public titulo:string; 
    public texto:string; 
    public data:Date;
    public tema:Tema;
    public presentes:number;
    public localidade:string;
    public usuario:Usuario;
    public numeroTelefone:string;
    public dataColeta:string;
   
  
  }