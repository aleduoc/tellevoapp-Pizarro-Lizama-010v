
/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { GoogleMapsService } from 'src/app/servicios/google-map.service';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';
import { IDetalles } from '../interfaces/interfaces';
import { LoadingController } from '@ionic/angular';


declare var google: any;

@Component({
  selector: 'app-viajarconductor',
  templateUrl: './viajarconductor.page.html',
  styleUrls: ['./viajarconductor.page.scss'],
})
export class ViajarconductorPage implements OnInit {

  tiempoEstimadoViaje: number | null = null; 

  async ngOnInit(): Promise<void> {
    //obtener la ubicación actual y mostrar el mapa
    await this.obtenerYMostrarUbicacionActual();

    // Registrar observador
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.lat = latitude;
        this.lng = longitude;
        // Actualizar mapa
        this.googleMapsService.actualizarUbicacionMapa({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error al obtener la ubicación en tiempo real:', error);
      }
    );
  }

  

  trazadoRuta: boolean = false;
  iniciarViajeHabilitado: boolean = false;
  terminarViajeHabilitado: boolean = false;
  estadoDisponible: 'default' | 'segment' = 'default';
  mapaCargando: boolean = false;

  private async mostrarCarga(): Promise<void> {
    this.mapaCargando = true;

    const loading = await this.loadingController.create({
      message: 'Cargando el mapa...', 
    });

    await loading.present();
  }

  private async ocultarCarga(): Promise<void> {
    this.mapaCargando = false;

    await this.loadingController.dismiss();
  }

  private async obtenerYMostrarUbicacionActual(): Promise<void> {
    try {
      // Mostrar carga mientras se obtiene la ubicación
      await this.mostrarCarga();

      const { lat, lng } = await this.googleMapsService.obtenerUbicacionActual();

      // Asignar ubicacion
      this.lat = lat;
      this.lng = lng;

      // Inicializa el mapa con la ubicación actual
      await this.googleMapsService.initMap(lat, lng, 'map');

      // Inicializar la funcionalidad de autocompletado y dirección en el mapa
      this.googleMapsService.initAutocompleteAndDirectionMap('map', { lat, lng });

    } catch (error) {
      console.error('Error al obtener la ubicación actual:', error);
      throw error; 
    } finally {

      await this.ocultarCarga();
    }
  }




  
  

  constructor(
    private menuController: MenuController,
    public authservice: AuthService,
    public alertcontroller: AlertController,
    private toastcontroller: ToastController,
    private googleMapsService: GoogleMapsService,
    private apicrud: ApiCrudService,
    private loadingController: LoadingController,
    private router: Router,
  ) { this.obtainStorage(); }

  direccionSeleccionada: boolean = false;

  usuario = {
    email: "",
    patente:"",
  }

  detalle: IDetalles = {
    id: 0, 
    email: "",
    direccion: "",
    precio: 2000,
    nota: "",
    patente: "",
  };
  

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

 
  

  lat = 0; // Latitud inicial
  lng = 0; // Longitud inicial
  inputText = ''; //  texto del input direccion
  predictions: google.maps.places.QueryAutocompletePrediction[] = [];


  async obtenerTiempoEstimadoViaje(destination: string): Promise<void> {
    try {
      const origin = { lat: this.lat, lng: this.lng };
      const result = await this.googleMapsService.obtenerCoordenadasDireccion(destination);
  
      if (result) {
        const response = await this.googleMapsService.getTravelTime(origin, result);
  
        console.log('Respuesta completa de la API de Google Maps:', response);
  
        if (response && response.rows && response.rows.length > 0) {
          const element = response.rows[0].elements[0];
  
          if (element && element.duration && element.duration.value) {
            const travelTimeInSeconds = element.duration.value;
            this.tiempoEstimadoViaje = Math.round(travelTimeInSeconds / 60);
            console.log('Tiempo estimado de viaje en segundos:', travelTimeInSeconds);
          } else {
            console.error('No se pudo obtener el tiempo estimado de viaje desde la respuesta:', element);
          }
        } else {
          console.error('Respuesta incorrecta de la API de Google Maps:', response);
        }
      }
    } catch (error) {
      console.error('Error al obtener el tiempo estimado de viaje:', error);
    }
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
    this.detalle.email = this.usuario.email;
    this.detalle.direccion = destination;
    this.detalle.patente = this.usuario.patente;

    await this.obtenerTiempoEstimadoViaje(destination);

    this.authservice.CrearDetalle(this.detalle).subscribe(
      (response: IDetalles) => {
        if (response) {
          // Actualizamos la propiedad 'id' con el valor de la respuesta
          this.detalle.id = response.id;
          this.googleMapsService.trazarRuta('map', origin, result);
          this.trazadoRuta = true;
          this.iniciarViajeHabilitado = true;
          this.terminarViajeHabilitado = false;
        } else {
          console.error('Respuesta del servicio vacía o no válida:', response);
          this.showToast('Error al trazar la ruta');
        }
      },
      (error) => {
        console.error('Error al crear el detalle', error);
        this.showToast('Error al trazar la ruta');
      }
    );
  } else {
    this.showToast('No se pudo obtener la coordenada de la dirección.');
  }
  this.direccionSeleccionada = false;
}

// ...


  iniciarViaje() {
    this.authservice.deleteDetalleById(this.detalle.id).subscribe(
    );
    this.iniciarViajeHabilitado = false;
    this.terminarViajeHabilitado = true;
  }

    terminarViaje() {

    this.trazadoRuta = false;
    this.iniciarViajeHabilitado = false;
    this.terminarViajeHabilitado = false;
    window.location.reload();
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
