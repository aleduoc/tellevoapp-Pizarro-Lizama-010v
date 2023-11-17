import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario={
    id: "",
    email:"",
    sede:"",
    rut:"",
    patente:"",
    password: "",
    rol: "",
  }

  username: any;

  constructor(private menuController: MenuController,
              private apicrud: ApiCrudService,
              private router: Router)  {
                this.ionViewWillEnter(); 
                this.username = sessionStorage.getItem("email")
  }

  ngOnInit() {
  }

  MostrarMenu(){
    this.menuController.open('first');
  }

  ionViewWillEnter(){
    let email = sessionStorage.getItem("email")

    if(email){
      this.usuario.email = email
    }

    this.getConductorById(email);
    this.getPasajeroById(email);
  }

  getConductorById(conductorEmail:any){
    this.apicrud.buscarConductor(conductorEmail).subscribe(
      (resp:any)=>{                 //resp llega en formato de arreglo de un objeto 
        this.usuario={
          id: resp[0].id,
          rut: resp[0].rut,
          email: resp[0].email,
          sede: resp[0].sede,
          patente: resp[0].patente,
          password: resp[0].password,
          rol: resp[0].rol
        }
      }
    )
  }

  getPasajeroById(pasajeroEmail:any){
    this.apicrud.buscarPasajero(pasajeroEmail).subscribe(
      (resp:any)=>{                 //resp llega en formato de arreglo de un objeto 
        this.usuario={
          id: resp[0].id,
          rut: resp[0].rut,
          email: resp[0].email,
          sede: resp[0].sede,
          patente: resp[0].patente,
          password: resp[0].password,
          rol: resp[0].rol
        }
      }
    )
  }

  updatePasajero(){
    this.apicrud.ActualizarPasajero(this.usuario).subscribe();
    this.router.navigateByUrl('/viajar')
    sessionStorage.setItem('sede',this.usuario.sede);  
  }

  actualizarConductor(){
    this.apicrud.ActualizarConductor(this.usuario).subscribe();
    this.router.navigateByUrl('/viajarconductor')
    sessionStorage.setItem('sede',this.usuario.sede); 
  }

}
