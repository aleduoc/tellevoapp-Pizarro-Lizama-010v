import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page implements OnInit {

  constructor(private menuController: MenuController) { }

  usuario = {
    email: '',
    password:'',
  }

  ngOnInit() {
  }

  MostrarMenu(){
    this.menuController.open('first')

  }

  Confirmar() {
    console.log('Confirmado')
    this.usuario.email='';
    this.usuario.password='';

  }

}
