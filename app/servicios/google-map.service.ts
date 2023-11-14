// google-map.service.ts
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';

// Declaración ambiental de 'google'
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private apiKey: string;
  private marker: any; 

  constructor() {
    // Obtener la API Key desde el environment
    this.apiKey = environments.googleMapsApiKey;
    this.marker = new google.maps.Marker();
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

  // Nuevo método para inicializar autocompletado y trazar línea
  initAutocompleteAndDirectionMap(elementId: string, origin: { lat: number, lng: number }): void {
    const map = new google.maps.Map(document.getElementById(elementId), {
      center: { lat: origin.lat, lng: origin.lng },
      zoom: 15
    });

    const marker = new google.maps.Marker({
      position: { lat: origin.lat, lng: origin.lng },
      map: map,
      title: 'Mi Ubicación',
      label: {
        text: 'Estás aquí',
        color: 'black',
        fontWeight: 'bold'
      }
    });

    const autocompleteInput = document.getElementById('ubicacion');
    const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
      fields: ["address_components", "geometry", "name"],
      types: ["address"],
    });

    autocomplete.addListener('place_changed', () => {
      const destination = autocomplete.getPlace();
      if (!destination.geometry) {
        window.alert('No details available for input: \'' + destination.name + '\'');
        return;
      }

      // Renderizar dirección y trazar línea
      this.renderAddressAndDirection(map, marker.getPosition(), destination.geometry.location);
    });
  }

  obtenerCoordenadasDireccion(direccion: string): Promise<{ lat: number, lng: number }> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: direccion }, (results: any, status: any) => {
        if (status === 'OK') {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject('No se pudo obtener la coordenada de la dirección.');
        }
      });
    });
  }

  trazarRuta(mapId: string, origin: { lat: number, lng: number }, destination: { lat: number, lng: number }): void {
    const map = new google.maps.Map(document.getElementById(mapId), {
      center: { lat: origin.lat, lng: origin.lng },
      zoom: 15
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const request = {
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, (result: any, status: any) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
      } else {
        console.error('Error al trazar la ruta:', status);
      }
    });
  }

  private renderAddressAndDirection(map: any, origin: any, destination: any): void {
    // Renderizar dirección
    map.setCenter(destination);
    this.marker.setPosition(destination);
    this.marker.setVisible(true);

    // Trazar línea entre origen y destino
    this.trazarRuta('map', origin, destination);
  }
}
