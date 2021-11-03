import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {
usuario:Usuario=new Usuario;
confirmarSenha:string;
tipoUser:string;
eColetor:string;
oEmail:string;
usuarioLogin:UsuarioLogin=new UsuarioLogin();
  constructor(
    private auth:AuthService,
    private router:Router,  
    private alertas: AlertasService
  ) { }
  
  ngOnInit(){
    window.scroll(0,0)
  }
entrar(){
  this.auth.entrar(this.usuarioLogin).subscribe((resp:UsuarioLogin)=>{
    this.usuarioLogin=resp
    environment.token=this.usuarioLogin.token;
    environment.nome=this.usuarioLogin.nome;
    environment.foto=this.usuarioLogin.foto;
    environment.id=this.usuarioLogin.id;
    environment.tipo=this.usuarioLogin.tipo;
    console.log(environment)
    
    
    this.usuarioLogin.foto;
    this.router.navigate(['/inicio'])
},erro=>{
  if(erro.status==401){
    this.alertas.showAlertSuccess('Usuário ou senha estão incorretos!')
  }
})
}

confirmSenha(event:any){
  this.confirmarSenha = event.target.value;
}
tipoUsuario(event: any){ 
  this.tipoUser = event.target.value; 
}
email(event: any){
  this.oEmail = event.target.value;
}
cadastrarUsuario(){
 if(this.usuario.foto=='' || this.usuario.foto == null){
   this.usuario.foto = 'assets/img/foflagem.jpg'
 }
  this.usuario.tipo = this.tipoUser;  
  if(this.usuario.senha != this.confirmarSenha){
    this.alertas.showAlertDanger('senhas incorretas')
  }else{
    this.auth.cadastrar(this.usuario).subscribe((resp:Usuario)=>{
      this.usuario=resp
      this.router.navigate(['/entrar'])
      this.alertas.showAlertSuccess('usuario cadastrado com sucesso')
    })
  }



}}
