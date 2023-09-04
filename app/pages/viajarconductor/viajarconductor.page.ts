import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-viajarconductor',
  templateUrl: './viajarconductor.page.html',
  styleUrls: ['./viajarconductor.page.scss'],
})
export class ViajarconductorPage implements OnInit {

  mostrarCarga: boolean = false;

  constructor(private menuController: MenuController,
              private alertController: AlertController) { }

  ngOnInit() {
  }

  MostrarMenu(){
    this.menuController.open('first');
  }

  Viajar() {
    this.mostrarCarga = true;
    setTimeout(() => {
      this.mostrarCarga = false;
    }, 4000);
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

