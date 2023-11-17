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
  async ngOnInit(): Promise<void> {
    // Llama a la función para obtener la ubicación actual y mostrar el mapa
    await this.obtenerYMostrarUbicacionActual();

    // Registra un observador para la ubicación en tiempo real
    navigator.geolocation.watchPosition(
      (position) => {
        // Callback cuando se obtiene una nueva posición
        const { latitude, longitude } = position.coords;
        this.lat = latitude;
        this.lng = longitude;
        // Actualiza el mapa con la nueva ubicación
        this.googleMapsService.actualizarUbicacionMapa({ lat: latitude, lng: longitude });
      },
      (error) => {
        // Maneja los errores en la obtención de la ubicación en tiempo real
        console.error('Error al obtener la ubicación en tiempo real:', error);
      }
    );
  }

  trazadoRuta: boolean = false;
  iniciarViajeHabilitado: boolean = false;
  cancelarViajeHabilitado: boolean = false;

  private obtenerYMostrarUbicacionActual(): void {
    // Obtiene la ubicación actual
    this.googleMapsService.obtenerUbicacionActual()
      .then(async ({ lat, lng }) => {
        // Asigna la ubicación actual
        this.lat = lat;
        this.lng = lng;
        // Inicializa el mapa con la ubicación actual
        await this.googleMapsService.initMap(lat, lng, 'map');
        // Ahora, puedes llamar a initAutocompleteAndDirectionMap
        this.googleMapsService.initAutocompleteAndDirectionMap('map', { lat, lng });
      })
      .catch((error) => {
        // Maneja los errores en la obtención de la ubicación actual
        console.error('Error al obtener la ubicación actual:', error);
      });
  }
  

  constructor(
    private menuController: MenuController,
    public authservice: AuthService,
    public alertcontroller: AlertController,
    private toastcontroller: ToastController,
    private googleMapsService: GoogleMapsService,
    private router: Router
  ) { this.obtainStorage(); }

  direccionSeleccionada: boolean = false;

  usuario = {
    email: "",
    patente:"",
  }

  detalle = {
    email:"",
    direccion: "",
    precio: 2000,
    nota: "",
    patente: "",
  }
  

  //Put Detalle
  public direccion:any;

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
      this.detalle.email = this.usuario.email;
      this.detalle.direccion = destination;
      this.detalle.patente = this.usuario.patente;
      this.authservice.CrearDetalle(this.detalle).subscribe();
      this.trazadoRuta = true;
      this.iniciarViajeHabilitado = true;
      this.cancelarViajeHabilitado = false;
    } else {
      this.showToast('No se pudo obtener la coordenada de la dirección.');
    }
    this.direccionSeleccionada = false;
  }

  iniciarViaje() {
    // Lógica para iniciar el viaje
    // ...
    // Después de iniciar el viaje, actualiza el estado de los botones
    this.iniciarViajeHabilitado = false;
    this.cancelarViajeHabilitado = true;
  }

  terminarViaje() {
    // Lógica para terminar el viaje
  
    // Después de presionar terminar el viaje, actualiza el estado de los botones
    this.trazadoRuta = false;
    this.iniciarViajeHabilitado = false;
    this.cancelarViajeHabilitado = false;
  
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

  logout() {
    this.authservice.logoutUser();
    this.router.navigate(['/inicio']);
    this.showToast('Se ha cerrado sesión');
  }

  MostrarMenu() {
    this.menuController.open('first');
  }

  obtainStorage() {
    let email = sessionStorage.getItem("email");
    let patente = sessionStorage.getItem("patente");

    if (email) {
      this.usuario.email = email;
    }if (patente) {
      this.usuario.patente = patente;
    }
  }

}
