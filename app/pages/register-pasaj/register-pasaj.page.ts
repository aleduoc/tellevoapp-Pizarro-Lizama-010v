import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register-pasaj',
  templateUrl: './register-pasaj.page.html',
  styleUrls: ['./register-pasaj.page.scss'],
})
export class RegisterPasajPage implements OnInit {

  constructor(private menuController: MenuController) { }

  usuario = {
    nombre: '',
    email: '',
    sede: '',
    rut: '',
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
    this.usuario.password='';

  }
}
