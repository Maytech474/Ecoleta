import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization',environment.token),
  };

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization',environment.token),
    };
  }

  getUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(
      `https://ecoletagen.herokuapp.com/usuarios/${id}`,this.token
    );
  }

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>(
      'https://ecoletagen.herokuapp.com/usuarios/logar',usuarioLogin
    );
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(
      'https://ecoletagen.herokuapp.com/usuarios/cadastrar',usuario
    );
  }

  logado() {
    let ok: boolean = false;

    if (environment.token != '') {
      ok = true;
    }
   

    return ok;
  }
  admin(){
    let ok: boolean = false;

    if (environment.tipo == 'adm') {
      ok = true;
    }

    return ok;
  }

  putUsuario(usuario:Usuario): Observable<Usuario>{
    return this.http.put<Usuario>('https://ecoletagen.herokuapp.com/usuarios/alterar',usuario,this.token)
}
}