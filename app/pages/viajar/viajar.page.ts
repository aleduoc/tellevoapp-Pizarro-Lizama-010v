import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-viajar',
  templateUrl: './viajar.page.html',
  styleUrls: ['./viajar.page.scss'],
})
export class ViajarPage implements OnInit {

  usuario: any;

  mostrarCarga: boolean = false;

  constructor(private alertController: AlertController,
              private menuController: MenuController,
              private authservice: AuthService,
              private router: Router,
              private toastcontroller: ToastController) { this.usuario = sessionStorage.getItem('email') }

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

  obtainStorage() {
    let email = sessionStorage.getItem("email");

    if (email) {
      this.usuario.email = email;
    }
  }

  logout() {
    this.authservice.logoutUser();
    this.router.navigate(['/inicio']);
    this.showToast('Se ha cerrado sesión');
  }
  async showToast(msg: any) {
    const toast = await this.toastcontroller.create({
      message: msg,
      duration: 3000
    })
    toast.present();
  }

}
