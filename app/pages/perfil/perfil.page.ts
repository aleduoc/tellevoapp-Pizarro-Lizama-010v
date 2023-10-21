import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario={
    email:"",
    sede:"",
    rut:"",
    patente:""
  }

  constructor(private menuController: MenuController) { this.obtainStorage(); }

  ngOnInit() {
  }

  obtainStorage(){
    let email = sessionStorage.getItem("email");
    let sede = sessionStorage.getItem("sede");
    let rut = sessionStorage.getItem("rut");
    let patente = sessionStorage.getItem("patente");
     
    if (email) {
      this.usuario.email = email;
    }if (sede) {
      this.usuario.sede = sede;
    }
    if (rut) {
      this.usuario.rut = rut;
    }if (patente) {
      this.usuario.patente = patente;
    }
  }

  MostrarMenu(){
    this.menuController.open('first');
  }

}
