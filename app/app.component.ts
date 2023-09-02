import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}


  componentes : Componente[] =[
    {
      name: 'Inicio',
      redirecTo: '/inicio',
      icon: 'invert-mode-outline'
    },
    {
      name: 'Home',
      redirecTo: '/home',
      icon: 'home-outline'
    },
    {
      name: 'Login',
      redirecTo: '/login',
      icon: 'home-outline'
    },
    {
      name: 'TipoUser',
      redirecTo: '/tipo-user',
      icon: 'home-outline'
    },
    {
      name: 'RegisterCond',
      redirecTo: '/register-cond',
      icon: 'information-circle-outline'
    },
    {
      name: 'Informacion',
      redirecTo: '/informacion',
      icon: 'information-circle-outline'
    },
    {
      name: 'RegisterPasaj',
      redirecTo: '/register-pasaj',
      icon: 'information-circle-outline'
    },
    {
      name: 'Viajar',
      redirecTo: '/viajar',
      icon: 'car-sport-outline'
    },
    {
      name: 'Perfil',
      redirecTo: '/perfil',
      icon: 'person-circle'
    },
    {
      name: 'Conductor',
      redirecTo: '/viajarconductor',
      icon: 'person-circle'
    },


  ]

}

interface Componente{
  icon: string;
  name: string;
  redirecTo: string;
}




