import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register-cond',
  templateUrl: './register-cond.page.html',
  styleUrls: ['./register-cond.page.scss'],
})
export class RegisterCondPage implements OnInit {

  constructor(private menuController: MenuController) { }

  usuario = {
    nombre: '',
    email: '',
    sede: '',
    rut: '',
    patente: '',
    password: '',
  }

  ngOnInit() {
  }

  MostrarMenu(){
    this.menuController.open('first')

  }

  Confirmar() {
    console.log('Confirmado')
    this.usuario.nombre='';
    this.usuario.email='';
    this.usuario.sede='';
    this.usuario.rut='';
    this.usuario.patente='';
    this.usuario.password='';

  }

}
