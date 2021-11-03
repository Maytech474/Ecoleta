import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {
  listaTrends: Tema[]
  listaTemas: Tema[];
  idTema: number;
  tema: Tema = new Tema();

  //!variaveis para o usuário
  idUser = environment.id;
  foto= environment.foto
  nome=environment.nome;
  usuario: Usuario = new Usuario();

  //? variaveis para a postagem
  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];
  minhasPostagens:Postagem[];
 

  
  tituloPost : string

  key = 'data'
  reverse = true
  idPostagem : Postagem = new Postagem();
  constructor(
    private router: Router,
    private temaService: TemaService,
    private auth: AuthService,
    private postagemService: PostagemService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/inicio']);
    }



    this.auth.refreshToken();
    
    this.getAllTemas();
    this.getAllPostagens();
    this.findUserById()
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
    console.log(this.postagem)
    this.postagemService
      .postPostagem(this.postagem)
      .subscribe((resp: Postagem) => {
        this.postagem = resp;
        this.alertas.showAlertSuccess('Postagem realizada com sucesso');
        this.postagem = new Postagem();
        this.getAllPostagens();
      });
  }

  curtida(id : number){
    this.postagemService.putCurtir(id).subscribe(()=>{
        this.getAllPostagens()
    })
  }

  getPostagemById(id : number){
    this.postagemService.getByIdPostagem(id).subscribe((resp:Postagem)=>{
      this.idPostagem = resp;
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
  marcada(id : number){
    this.postagemService.putMarcar(id).subscribe(()=>{
        this.getAllPostagens()
    })
  }
}