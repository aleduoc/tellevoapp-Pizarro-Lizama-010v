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
      name: 'Login',
      redirecTo: '/login',
      icon: 'invert-mode-outline'
    },
    {
      name: 'TipoUser',
      redirecTo: '/tipo-user',
      icon: 'invert-mode-outline'
    },
  
  ]

}

interface Componente{
  icon: string;
  name: string;
  redirecTo: string;
}




