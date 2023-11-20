import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IConductores } from '../pages/interfaces/interfaces';
import { IPasajeros } from '../pages/interfaces/interfaces';
import { Router } from '@angular/router';
import { IDetalle,IDetalles } from '../pages/interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient,
              private router: Router) { }

  //obtener todos los usuarios
  getAllConductores():Observable<IConductores>{
    return this.httpclient.get<IConductores>(`${environment.apiUrl}/conductores`);
  }

  getUserByEmail(email: any):Observable<IConductores>{
    return this.httpclient.get<IConductores>(`${environment.apiUrl}/conductores/?email=${email}`);
  }

  getAllPasajeros():Observable<IPasajeros>{
    return this.httpclient.get<IPasajeros>(`${environment.apiUrl}/pasajeros`);
  }

  getUserByEmail1(email: any):Observable<IPasajeros>{
    return this.httpclient.get<IPasajeros>(`${environment.apiUrl}/pasajeros/?email=${email}`);
  }

  isLoggedIn(){
    return sessionStorage.getItem('email')!=null;
  }

  logoutUser(){
    sessionStorage.clear();
    this.router.navigate(['/events'])
  }

  //detalle del viaje
  CrearDetalle(newmensaje:IDetalle):Observable<IDetalle>{
    return this.httpclient.post<IDetalles>(`${environment.apiUrl}/detalle`, newmensaje);

  }

  deleteDetalleById(id: number): Observable<IDetalles> {
    return this.httpclient.delete<IDetalles>(`${environment.apiUrl}/detalle/${id}`);
  }
  
  
  getAllViajes():Observable<IDetalles>{
    return this.httpclient.get<IDetalles>(`${environment.apiUrl}/detalle`);
  }

  getViajeWithId(id:number):Observable<IDetalles>{
    return this.httpclient.get<IDetalles>(`${environment.apiUrl}/detalle/?id=${id}`);
  }
}
