import { Postagem } from "./Postagem";

export class Tema{ 
    public id:number;
    public descricao:string;
    public numeroPostagens:number;
    public fotoLink:string;
    public postagem:Postagem[];
    public textoTema:string;
    public sites:string;
  
  }