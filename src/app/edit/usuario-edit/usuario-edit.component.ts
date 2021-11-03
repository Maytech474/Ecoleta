import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {
  usuario: Usuario = new Usuario();
  idUser: number;
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,

  ) {}

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

    cadastrarUsuario(){
   if(this.usuario.foto==''){
     this.usuario.foto = 'assets/img/foflagem.jpg'
   }
  }
  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  findByIdUser(id: number) {
    this.authService.getUserById(this.idUser).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }
  

  atualizar() {
    this.usuario.tipo = this.tipoUsuario

    if (this.usuario.senha != this.confirmarSenha) {
     
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/inicio'])
        alert('Usuario cadastrado com sucesso,faça o login novamente')
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0

        this.router.navigate(['/entrar'])
      })
    }
  }

}