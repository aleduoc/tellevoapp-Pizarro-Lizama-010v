import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpass',
  templateUrl: './newpass.page.html',
  styleUrls: ['./newpass.page.scss'],
})


export class NewpassPage implements OnInit {

  esPasajero: boolean = true;
  email: string = '';
  nuevaPassword: string = '';

  usuario = {
    id: '',
    email: '',
    password:'',
  }
  username: any;

  constructor(private alertController: AlertController,
              private apicrud: ApiCrudService,
              private menuController: MenuController,
              private router: Router) { 
                this.ionViewWillEnter(); 
                this.username = sessionStorage.getItem("email")
              }


  ngOnInit() {
  }

  MostrarMenu(){
    this.menuController.open('first')

  }

  ionViewWillEnter(){
    if (this.email) {
      this.usuario.email = this.email;
      this.getConductorById(this.usuario.email);
      this.getPasajeroById(this.usuario.email);
    }
  }


  getConductorById(conductorEmail:any){
    this.apicrud.buscarConductor(conductorEmail).subscribe(
      (resp:any)=>{                 //resp llega en formato de arreglo de un objeto 
        this.usuario={
          id: resp[0].id,
          email: resp[0].email,
          password: resp[0].password
        }
      }
    )
  }

  getPasajeroById(pasajeroEmail:any){
    this.apicrud.buscarPasajero(pasajeroEmail).subscribe(
      (resp:any)=>{                 //resp llega en formato de arreglo de un objeto 
        this.usuario={
          id: resp[0].id,
          email: resp[0].email,
          password: resp[0].password
        }
      }
    )
  }

  
  updatePasajero(email: string, nuevaPassword: string) {
    this.apicrud.buscarPasajero(email).subscribe(
      (resp: any) => {
        if (resp.length > 0) {
          const pasajero = resp[0];
          pasajero.password = nuevaPassword;
  
          this.apicrud.ActualizarPasajero(pasajero).subscribe(() => {
            this.router.navigateByUrl('/inicio');
            sessionStorage.setItem('password', nuevaPassword);
  
            this.mostrarMensaje('Contraseña cambiada con éxito');
          });
        } else {
          this.mostrarMensaje('Usuario no encontrado');
        }
      }
    );
  }
  
  updatePassword(email: string, nuevaPassword: string) {
    if (this.esPasajero) {
      this.updatePasajero(email, nuevaPassword);
    } else {
      this.actualizarConductor(email, nuevaPassword);
    }
  }

  toggleRol() {
    this.esPasajero = !this.esPasajero;
  }

  actualizarConductor(email: string, nuevaPassword: string){
    this.apicrud.buscarConductor(email).subscribe(
      (resp: any) => {
        if (resp.length > 0) {
          const conductor = resp[0];
          conductor.password = nuevaPassword;
  
          this.apicrud.ActualizarConductor(conductor).subscribe(() => {
            this.router.navigateByUrl('/inicio');
            sessionStorage.setItem('password', nuevaPassword);

            this.mostrarMensaje('Contraseña cambiada con éxito');
          });
        } else {
          this.mostrarMensaje('Usuario no encontrado');
        }
      }
    );
  }

  async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Recuperación de contraseña',
      message: mensaje,
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }
  

  Confirmar() {
    console.log('Confirmado')
    this.usuario.email='';
    this.usuario.password='';

  }


}
