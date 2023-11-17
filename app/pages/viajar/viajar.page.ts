import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { LoadingController } from '@ionic/angular';
import { IDetalles } from '../interfaces/interfaces';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-viajar',
  templateUrl: './viajar.page.html',
  styleUrls: ['./viajar.page.scss'],
})
export class ViajarPage implements OnInit {

  detalle:IDetalles[]=[];
  usuario: any;

  mostrarCarga: boolean = false;

  constructor(private alertController: AlertController,
              private menuController: MenuController,
              private authservice: AuthService,
              private router: Router,
              private loadCtrl: LoadingController,
              private toastcontroller: ToastController) { this.usuario = sessionStorage.getItem('email'); this.LoadViajes(); }

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


  //CargarTodosLosViajes
  async LoadViajes(event?:InfiniteScrollCustomEvent){
    const load = await this.loadCtrl.create({ 
      message: "Cargando Sus Viajes",
      spinner:"crescent"
    });
    await load.present();

    this.authservice.getAllViajes().subscribe({ 
      next:resp=>{
        console.log(resp);
        load.dismiss();
        let listString = JSON.stringify(resp); //Convertimos a String nuestro resp
        this.detalle = JSON.parse(listString); //Convertiremos a JSON el string para almacenar
        event?.target.complete();
      },
      error: err=>{
        console.log(err.error.message);
        load.dismiss();
      }
    })

  }

}
