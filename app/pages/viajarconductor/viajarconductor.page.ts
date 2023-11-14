// viajarconductor.page.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { GoogleMapsService } from 'src/app/servicios/google-map.service';

@Component({
  selector: 'app-viajarconductor',
  templateUrl: './viajarconductor.page.html',
  styleUrls: ['./viajarconductor.page.scss'],
})

export class ViajarconductorPage implements OnInit {
  usuario = {
    email: "",
  }

  @ViewChild('ubicacionInput') ubicacionInput: any;

  mostrarCarga: boolean = false;

  lat = 0; // Latitud inicial
  lng = 0; // Longitud inicial

  constructor(private menuController: MenuController,
    public authservice: AuthService,
    private toastcontroller: ToastController,
    private googleMapsService: GoogleMapsService,
    private router: Router) { this.obtainStorage(); }

  ngOnInit(): void {
    this.googleMapsService.obtenerUbicacionActual()
      .then(({ lat, lng }) => {
        this.lat = lat;
        this.lng = lng;
        this.googleMapsService.initAutocompleteAndDirectionMap('map', { lat, lng });
      })
      .catch((error) => {
        console.error('Error al obtener la ubicación:', error);
      });
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

  MostrarMenu() {
    this.menuController.open('first');
  }

  async trazarRuta() {
    const inputElement = this.ubicacionInput.el.querySelector('input');
    inputElement.blur();

    const destination = inputElement.value;

    if (!destination) {
      this.showToast('Por favor, selecciona una dirección.');
      return;
    }

    const result = await this.googleMapsService.obtenerCoordenadasDireccion(destination);

    if (result) {
      const origin = { lat: this.lat, lng: this.lng };
      this.googleMapsService.trazarRuta('map', origin, result);
    } else {
      this.showToast('No se pudo obtener la coordenada de la dirección.');
    }
  }

  async showToast(msg: any) {
    const toast = await this.toastcontroller.create({
      message: msg,
      duration: 3000
    })
    toast.present();
  }
}

  
  



