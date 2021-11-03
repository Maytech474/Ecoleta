import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
usuario:Usuario=new Usuario;
confirmarSenha:string;
tipoUser:string;
eColetor:string;
oEmail:string;
  constructor( private authService: AuthService,
                private router:Router,
                private alertas: AlertasService
    ) 
  { 
   
  }

  ngOnInit(){
    window.scroll(0,0)

    
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
     this.usuario.foto = 'https://raw.githubusercontent.com/vinibol22/Ecoleta/criacao-novapage-tema/src/assets/img/anonimo.jpeg'
   }
    this.usuario.tipo = this.tipoUser;  
    if(this.usuario.senha != this.confirmarSenha){
      this.alertas.showAlertDanger('senhas incorretas')
    }else{
      this.authService.cadastrar(this.usuario).subscribe((resp:Usuario)=>{
        this.usuario=resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('usuario cadastrado com sucesso')
      })
    }
  }

}
