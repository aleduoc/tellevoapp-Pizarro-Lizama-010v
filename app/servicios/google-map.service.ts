import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private apiKey: string;
  private marker: any;
  private map: any;




  constructor() {
    // Obtener la API Key desde el environment
    this.apiKey = environments.googleMapsApiKey;
    this.marker = new google.maps.Marker();
  }
  
  initMap(lat: number, lng: number, elementId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const map = new google.maps.Map(document.getElementById(elementId), {
        center: { lat, lng },
        zoom: 15
      });
  
      this.marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: 'Mi Ubicación',
        animation: google.maps.Animation.BOUNCE,
        label: {
          text: 'Estás aquí',
          color: 'black',
          fontWeight: 'bold'
        }
      });
  
      // Guardar el mapa para futuras referencias
      this.map = map;
  
      // Resuelve la promesa una vez que el mapa y el marcador estén inicializados
      resolve();
    });
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



  initAutocompleteAndDirectionMap(elementId: string, origin: { lat: number, lng: number }): void {
    const map = new google.maps.Map(document.getElementById(elementId), {
      center: { lat: origin.lat, lng: origin.lng },
      zoom: 15
    });

    const marker = new google.maps.Marker({
      position: { lat: origin.lat, lng: origin.lng },
      map: map,
      title: 'Mi Ubicación',
      animation: google.maps.Animation.BOUNCE,
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

  actualizarUbicacionMapa(newLocation: { lat: number; lng: number }): void {
    if (this.map && this.marker) {
      // Actualiza la posición del marcador en el mapa
      this.marker.setPosition(new google.maps.LatLng(newLocation.lat, newLocation.lng));
  
      // Centra el mapa en la nueva ubicación
      this.map.panTo(new google.maps.LatLng(newLocation.lat, newLocation.lng));
    } else {
      console.error('Mapa o marcador no inicializado.');
    }
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
