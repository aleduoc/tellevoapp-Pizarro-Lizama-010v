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

  private baseUrl = 'https://my-json-server.typicode.com/aleduoc/apiconductores';

  constructor(private httpclient: HttpClient) {}

  listarConductores():Observable<IConductores>{
    return this.httpclient.get<IConductores>(`${this.baseUrl}/conductores`);
  }

  crearConductor(NewConductor:IConductor):Observable<IConductores>{
    return this.httpclient.post<IConductores>(`${this.baseUrl }/conductores`, NewConductor);
  }


  
  getDetalles(): IDetalles[] {
    return this.detalles;
  }

  // Método para eliminar un detalle por ID
  deleteDetalleById(id: number): void {
    this.detalles = this.detalles.filter((detalle) => detalle.id !== id);
  }
  
  

  
  
  listarPasajeros():Observable<IPasajeros>{
    return this.httpclient.get<IPasajeros>(`${this.baseUrl }/pasajeros`);
  }

  crearPasajero(NewPasajero:IPasajero):Observable<IPasajeros>{
    return this.httpclient.post<IPasajeros>(`${this.baseUrl }/pasajeros`, NewPasajero);
  }
 
  //Actualizar Perfil
  buscarPasajero(email:string):Observable<IPasajeros>{
    return this.httpclient.get<IPasajeros>(`${this.baseUrl }/pasajeros/?email=${email}`);
  }
  buscarConductor(email:string):Observable<IConductores>{
    return this.httpclient.get<IConductores>(`${this.baseUrl }/conductores/?email=${email}`);
  }

  ActualizarPasajero(pasajero:any):Observable<IPasajeros>{
    return this.httpclient.put<IPasajeros>(`${this.baseUrl }/pasajeros/${pasajero.id}`, pasajero);
  }

  
  ActualizarConductor(conductor:any):Observable<IConductores>{
    return this.httpclient.put<IConductores>(`${this.baseUrl }/conductores/${conductor.id}`, conductor);
  }

  verificarCorreoExistente(correo: string): Observable<any> {
    return this.httpclient.get<any>(`${this.baseUrl }/pasajeros/?email=${correo}`);
  }
  verificarCorreoExistenteAlumno(correo: string): Observable<any> {
    return this.httpclient.get<any>(`${this.baseUrl }/conductores/?email=${correo}`);
  }

}
