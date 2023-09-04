import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private menuController: MenuController,
              private alertController: AlertController) { }

  ngOnInit() {
  }

  MostrarMenu(){
    this.menuController.open('first')

  }

  async CerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cierre de sesión',
      message: 'Has cerrado sesión con exito;)',
      buttons: ['volver a inicio'],
    });

    await alert.present();
  }


}
