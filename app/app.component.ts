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
      icon: 'home-outline'
    },

  
  ]

}

interface Componente{
  icon: string;
  name: string;
  redirecTo: string;
}




