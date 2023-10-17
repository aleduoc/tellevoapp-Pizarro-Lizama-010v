import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AutorizadoGuard {

  constructor (private authservice: AuthService,
                private router: Router,
                private toastcontroller: ToastController){

                }

  canActivate():

  | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (! this.authservice.isLoggedIn()){
      this.showToast('Debe iniciar sesión');
      this.router.navigateByUrl("/inicio");
      return false;
    }
    this.authservice.isLoggedIn();
    return true;
}

  async showToast(msg:any){
    const toast= await this.toastcontroller.create({
      message: msg,
      duration: 3000
    })
    toast.present();
  }
}
