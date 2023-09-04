import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-newpass',
  templateUrl: './newpass.page.html',
  styleUrls: ['./newpass.page.scss'],
})
export class NewpassPage implements OnInit {

  constructor(private alertController: AlertController,
              private menuController: MenuController) { }

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

  async MensajeInicio() {
    const alert = await this.alertController.create({
      header: 'Recuperacion de contraseña',
      message: 'Revisa tu correo para restablecer tu contraseña',
      buttons: ['volver a inicio'],
    });

    await alert.present();
  }

}
