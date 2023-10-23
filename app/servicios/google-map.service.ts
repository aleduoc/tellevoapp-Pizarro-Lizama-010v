import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';

// Declaración ambiental de 'google'
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private apiKey: string;

  constructor() {
    // Obtener la API Key desde el environment
    this.apiKey = environments.googleMapsApiKey;
  }

  obtenerUbicacionActual(): Promise<{ lat: number, lng: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          resolve({ lat, lng });
        }, (error) => {
          reject(error);
        });
      } else {
        reject(new Error('Geolocalización no es soportada por este navegador.'));
      }
    });
  }

  initMap(lat: number, lng: number, elementId: string): void {
    // Inicializar mapa
    const map = new google.maps.Map(document.getElementById(elementId), {
      center: { lat, lng },
      zoom: 15
    });

    new google.maps.Marker({
      position: { lat, lng },
      map: map,
      title: 'Mi Ubicación',
      label: {
        text: 'Estás aquí',
        color: 'black',
        fontWeight: 'bold'
      }
    });
  }

}
