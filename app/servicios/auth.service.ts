import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IConductores } from '../pages/interfaces/interfaces';
import { Router } from '@angular/router';


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

  isLoggedIn(){
    return sessionStorage.getItem('email')!=null;
  }

  logoutUser(){
    sessionStorage.clear();
    this.router.navigate(['/events'])
  }

}
