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
  selector: 'app-barra-lateral-direita',
  templateUrl: './barra-lateral-direita.component.html',
  styleUrls: ['./barra-lateral-direita.component.css']
})
export class BarraLateralDireitaComponent implements OnInit {

  listaTrends: Tema[]
  listaTemas: Tema[];
  idTema: number;
  tema: Tema = new Tema();
  descricaoTema : string;

  //!variaveis para o usuário
  idUser=environment.id;
  foto=environment.foto
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
      console.log(this.listaTrends)
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
