import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
// importações do tema
import { TemaService } from './../service/tema.service';
import { Tema } from '../model/Tema';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';
import { AlertasService } from '../service/alertas.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  listaTrends: Tema[]
  listaTemas: Tema[];
  idTema: number;
  tema: Tema = new Tema();
  descricaoTema : string;

  //!variaveis para o usuário
  idUser=environment.id;
  foto=environment.foto;
  nome=environment.nome
  usuario: Usuario = new Usuario();

  //? variaveis para a postagem
 
  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];
  idPostagem : Postagem = new Postagem();

  tituloPost : string
  num:number=0
  num1:number=1
  num3:number

   key = 'data'
   reverse = true
  constructor(
    private router: Router,
    private temaService: TemaService,
    public auth: AuthService,
    private postagemService: PostagemService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar']);
    }

    this.auth.refreshToken();
    
    this.getAllTemas();
    this.getAllPostagens();
    this.getAllTrends();
    
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }
  getAllTrends(){
    this.temaService.getTrends().subscribe((resp : Tema[])=>{
      
      this.listaTrends=resp;
     
       
      
    })
  }
 
  findByIdTema() {
    this.temaService.getTemaById(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  findUserById() {
    this.auth.getUserById(this.idUser).subscribe((resp: Usuario) => {
      this.usuario = resp;
    });
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    
    });
  }

  postar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    this.usuario.id = this.idUser;
    this.postagem.usuario = this.usuario;

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
        this.postagem = resp;
       this.alertas.showAlertSuccess('Postagem realizada com sucesso');
        this.postagem = new Postagem();
        this.getAllPostagens();
      });
  }

  getPostagemById(id : number){
    this.postagemService.getByIdPostagem(id).subscribe((resp:Postagem)=>{
      this.idPostagem = resp;
    })
  }

  curtida(id : number){
    this.postagemService.putCurtir(id).subscribe(()=>{
        this.getAllPostagens()
    })
  }
  descurtida(id : number){
    this.postagemService.putDescurtir(id).subscribe(()=>{
      this.getAllPostagens()
  })
  }


  marcada(id : number){
    this.postagemService.putMarcar(id).subscribe(()=>{
        this.getAllPostagens()
    })
  }
  desmarcada(id : number){
    this.postagemService.putDesmarcar(id).subscribe(()=>{
      this.getAllPostagens()
  })

  }



findByTituloPostagem(){
  if(this.tituloPost == ''){
    this.getAllPostagens();
  }else{
     this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp:Postagem[])=>{
    this.listaPostagens=resp
  })
  }
 
}
findByDescricaoTema(){
  if(this.descricaoTema == ''){
    this.getAllTemas();
  }else{
     this.temaService.getByDescricaoTema(this.descricaoTema).subscribe((resp:Tema[])=>{
    this.listaTemas=resp
})

}
}
}
