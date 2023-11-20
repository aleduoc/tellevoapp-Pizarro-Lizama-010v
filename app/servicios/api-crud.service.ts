import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConductores, IConductor, IDetalle, IDetalles } from '../pages/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { IPasajeros, IPasajero } from '../pages/interfaces/interfaces';






@Injectable({
  providedIn: 'root'
})
export class ApiCrudService {
  private detalles: IDetalles[] = [];

  constructor(private httpclient: HttpClient) {}

  listarConductores():Observable<IConductores>{
    return this.httpclient.get<IConductores>(`${environment.apiUrl}/conductores`);
  }

  crearConductor(NewConductor:IConductor):Observable<IConductores>{
    return this.httpclient.post<IConductores>(`${environment.apiUrl}/conductores`, NewConductor);
  }


  
  getDetalles(): IDetalles[] {
    return this.detalles;
  }

  // Método para eliminar un detalle por ID
  deleteDetalleById(id: number): void {
    this.detalles = this.detalles.filter((detalle) => detalle.id !== id);
  }
  
  

  
  
  listarPasajeros():Observable<IPasajeros>{
    return this.httpclient.get<IPasajeros>(`${environment.apiUrl}/pasajeros`);
  }

  crearPasajero(NewPasajero:IPasajero):Observable<IPasajeros>{
    return this.httpclient.post<IPasajeros>(`${environment.apiUrl}/pasajeros`, NewPasajero);
  }
 
  //Actualizar Perfil
  buscarPasajero(email:string):Observable<IPasajeros>{
    return this.httpclient.get<IPasajeros>(`${environment.apiUrl}/pasajeros/?email=${email}`);
  }
  buscarConductor(email:string):Observable<IConductores>{
    return this.httpclient.get<IConductores>(`${environment.apiUrl}/conductores/?email=${email}`);
  }

  ActualizarPasajero(pasajero:any):Observable<IPasajeros>{
    return this.httpclient.put<IPasajeros>(`${environment.apiUrl}/pasajeros/${pasajero.id}`, pasajero);
  }

  
  ActualizarConductor(conductor:any):Observable<IConductores>{
    return this.httpclient.put<IConductores>(`${environment.apiUrl}/conductores/${conductor.id}`, conductor);
  }

  verificarCorreoExistente(correo: string): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiUrl}/pasajeros/?email=${correo}`);
  }
  verificarCorreoExistenteAlumno(correo: string): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiUrl}/conductores/?email=${correo}`);
  }

}
