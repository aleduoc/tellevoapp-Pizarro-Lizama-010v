import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { AuthService } from 'src/app/servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page implements OnInit {

  loginForm: FormGroup;
  showAlert:boolean = false;
  userdata: any;

  IConductores = {
    id: 0,
    email: "",
    sede: "",
    rut: "",
    patente: "",
    password: "",
    rol:""
  }

  constructor(private menuController: MenuController,
              private authservice: AuthService,
              private router: Router,
              private alertcontroller: AlertController,
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
      this.authservice.getUserByEmail(this.loginForm.value.email).subscribe(resp=>{
        this.userdata=resp;
        console.log(this.userdata);
        if (this.userdata.length>0) { 
          this.IConductores={
            id: this.userdata[0].id,
            email : this.userdata[0].email,
            sede: this.userdata[0].sede,
            rut: this.userdata[0].rut,
            patente: this.userdata[0].patente,
            password: this.userdata[0].password,
            rol: this.userdata[0].rol
          }
          if (this.IConductores.password === this.loginForm.value.password){
            sessionStorage.setItem('email', this.IConductores.email);
            sessionStorage.setItem('sede', this.IConductores.sede);
            sessionStorage.setItem('rut', this.IConductores.rut);
            sessionStorage.setItem('patente', this.IConductores.patente);
            sessionStorage.setItem('rol', this.IConductores.rol);
            sessionStorage.setItem('ingresado', 'true');
            this.showToast('Sesion iniciada');
            this.router.navigateByUrl("/viajarconductor").then(() => {
              window.location.reload();});
          }
        }if (this.IConductores.password != this.loginForm.value.password){
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
