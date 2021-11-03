import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import {InicioComponent } from './inicio/inicio.component';
import { TemaComponent } from './tema/tema.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import{MypostsComponent} from './myposts/myposts.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';
import { EventosComponent } from './eventos/eventos.component';
import { SuporteComponent } from './suporte/suporte.component';
import { TipoPostagensComponent } from './tipo-postagens/tipo-postagens.component';


const routes: Routes = [

  {path:"",redirectTo:'entrar',pathMatch:'full'},
  {
    path:"entrar",component:EntrarComponent
  },
  {
    path:"cadastrar",component:CadastrarComponent
  },
  { path:"inicio",component:InicioComponent

  },{
      path:"tema",component:TemaComponent
  },{
    path:"tema-edit/:id",component:TemaEditComponent
  },{
    path:"tema-delete/:id",component:TemaDeleteComponent
  },{
    path:"postagem-edit/:id", component: PostagemEditComponent
  },{
    path:"postagem-delete/:id", component: PostagemDeleteComponent
  },{
    path:"myposts",component:MypostsComponent
  },{
    path:"usuario-edit",component:UsuarioEditComponent
  },
  {
    path:"eventos",component:EventosComponent
  },
  {
    path:"suporte",component:SuporteComponent
  },
  {
    path:"tipo-postagens",component:TipoPostagensComponent
  },





  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
