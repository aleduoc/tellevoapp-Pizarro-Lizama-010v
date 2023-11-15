import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { AuthService } from 'src/app/servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  showAlert: boolean = false;
  userdata: any;

  IPasajeros = {
    id: 0,
    email: "",
    sede: "",
    rut: "",
    password: "",
    rol:""
  }

  constructor(private menuController: MenuController,
              private authservice: AuthService,
              private router: Router,
              private alertController: AlertController,
              private toastcontroller: ToastController,
              private fbuilder: FormBuilder) { 
                this.loginForm = this.fbuilder.group({
                  'email' : new FormControl("", [Validators.required, Validators.email]),
                  'password' : new FormControl("", [Validators.required, Validators.minLength(8)])
                })
              }


  ngOnInit() {
  }

  MostrarMenu(){
    this.menuController.open('first')

  }

  Confirmar() {
    this.showAlert = false;
    if (this.loginForm.valid) {
      this.authservice.getUserByEmail1(this.loginForm.value.email).subscribe(resp=>{
        this.userdata=resp;
        console.log(this.userdata);
        if (this.userdata.length>0) { 
          this.IPasajeros={
            id: this.userdata[0].id,
            email : this.userdata[0].email,
            sede: this.userdata[0].sede,
            rut: this.userdata[0].rut,
            password: this.userdata[0].password,
            rol: this.userdata[0].rol
          }
          if (this.IPasajeros.password === this.loginForm.value.password){
            sessionStorage.setItem('email', this.IPasajeros.email);
            sessionStorage.setItem('sede', this.IPasajeros.sede);
            sessionStorage.setItem('rut', this.IPasajeros.rut);
            sessionStorage.setItem('rol', this.IPasajeros.rol);
            sessionStorage.setItem('ingresado', 'true');
            this.showToast('Sesion iniciada');
            this.router.navigateByUrl("/viajar").then(() => {
              window.location.reload();});
          }
        }if (this.IPasajeros.password != this.loginForm.value.password){
          this.showAlert = true;
        }
      })
    }
  }

  async showToast(msg: any){
    const toast= await this.toastcontroller.create({
      message: msg,
      duration: 3000
    })
    toast.present();
  }

}
