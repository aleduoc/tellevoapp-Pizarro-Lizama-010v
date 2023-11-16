// viajarconductor.page.ts
/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { GoogleMapsService } from 'src/app/servicios/google-map.service';

declare var google: any;
@Component({
  selector: 'app-viajarconductor',
  templateUrl: './viajarconductor.page.html',
  styleUrls: ['./viajarconductor.page.scss'],
})

export class ViajarconductorPage implements OnInit {

  direccionSeleccionada: boolean = false;
  usuario = {
    email: "",
  }

  public alertButtons = ['OK'];
  public alertInputs = [
    {
      type: 'number',
      placeholder: 'precio',
      min: 2000,
      max: 10000,
    },
    {
      type: 'textarea',
      placeholder: 'nota adicional',
    },
  ];

  @ViewChild('ubicacionInput') ubicacionInput: any;

  mostrarCarga: boolean = false;

  lat = 0; // Latitud inicial
  lng = 0; // Longitud inicial
  inputText = ''; //  texto del input direccion
  predictions: google.maps.places.QueryAutocompletePrediction[] = [];

  constructor(
    private menuController: MenuController,
    public authservice: AuthService,
    private toastcontroller: ToastController,
    private googleMapsService: GoogleMapsService,
    private router: Router
  ) { this.obtainStorage(); }

  

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
    this.direccionSeleccionada = false;

    
  }

  async searchPredictions() {
    const autocompleteInput = this.ubicacionInput.el.querySelector('input');
    const autocompleteService = new google.maps.places.AutocompleteService();
    const sessionToken = new google.maps.places.AutocompleteSessionToken();
  
    const options = {
      input: this.inputText,
      sessionToken: sessionToken,
      origin: new google.maps.LatLng(this.lat, this.lng),
      componentRestrictions: { country: 'CL' } 
    };
  
    autocompleteService.getPlacePredictions(options, (predictions: any, status: any) => {
      if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
        this.predictions = predictions;
      } else {
        this.predictions = [];
      }
    });
  }
  
  

  selectPrediction(prediction: any) {
    this.inputText = prediction.description;
    this.predictions = [];
    this.direccionSeleccionada = true;
  }

  async showToast(msg: any) {
    const toast = await this.toastcontroller.create({
      message: msg,
      duration: 3000
    })
    toast.present();
  }
}
