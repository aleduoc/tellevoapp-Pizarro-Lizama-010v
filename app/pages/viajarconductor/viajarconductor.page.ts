import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viajarconductor',
  templateUrl: './viajarconductor.page.html',
  styleUrls: ['./viajarconductor.page.scss'],
})
export class ViajarconductorPage implements OnInit {
  usuario={
    email:"",
  }
  mostrarCarga: boolean = false;

  constructor(private menuController: MenuController,
              private alertController: AlertController,
              public authservice: AuthService,
              private toastcontroller: ToastController,
              private router: Router) { this.obtainStorage(); }

  ngOnInit() {
  }

  obtainStorage(){
    let email = sessionStorage.getItem("email");
     
    if (email) {
      this.usuario.email = email;
    }
  }

  logout() {
    this.authservice.logoutUser(); // Llama al método logout del servicio
    this.router.navigate(['/inicio']);
    this.showToast('Se ha cerrado sesión');
  }

  async showToast(msg:any){
    const toast= await this.toastcontroller.create({
      message: msg,
      duration: 3000
    })
    toast.present();
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


}

