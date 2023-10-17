import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConductores, IConductor } from '../pages/interfaces/interfaces';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiCrudService {

  constructor(private httpclient: HttpClient) { }

  listarConductores():Observable<IConductores>{
    return this.httpclient.get<IConductores>(`${environment.apiUrl}/conductores`);
  }

  crearConductor(NewConductor:IConductor):Observable<IConductores>{
    return this.httpclient.post<IConductores>(`${environment.apiUrl}/conductores`, NewConductor);
  }
}
