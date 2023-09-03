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
      name: 'Información',
      redirecTo: '/informacion',
      icon: 'information-circle-outline'
    },
    


  ]

}

interface Componente{
  icon: string;
  name: string;
  redirecTo: string;
}




