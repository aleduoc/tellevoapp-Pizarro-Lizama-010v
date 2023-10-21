import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';
import { IConductor } from '../interfaces/interfaces';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'; 
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register-cond',
  templateUrl: './register-cond.page.html',
  styleUrls: ['./register-cond.page.scss'],
})
export class RegisterCondPage implements OnInit {

  registerForm: FormGroup;
  userdata: any;

  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private router: Router,
              private apicrud: ApiCrudService,
              private fbuilder: FormBuilder) {
                this.registerForm = this.fbuilder.group({
                  'email': new FormControl("",[Validators.required, Validators.email]),
                  'sede': new FormControl("",[Validators.required]),
                  'rut': new FormControl("",[Validators.required, Validators.minLength(4),Validators.minLength(9),Validators.pattern(/^(\d{1,3}(?:\.\d{1,3}){2}-\d|(\d{1,3}){2}-\d{1,3}(?:\.\d{1,3})|(\d{1,3}){2}-\d{1,3}(?:\.\d{1,3})?)$/)]),
                  'patente': new FormControl("",[Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
                  'password':new FormControl("", [Validators.required, Validators.minLength(8)]),
                });
               }

  NewConductor = {
    email: '',
    sede: '',
    rut: '',
    patente: '',
    password: '',
  }

  ngOnInit() {
  }

  registroChofer() {
    if (this.registerForm.valid) {
      this.apicrud.crearConductor(this.registerForm.value).subscribe(resp => {
        this.userdata = resp;
        if (this.userdata.length > 0) {
          this.NewConductor = {
            email: this.userdata[0].email,
            sede: this.userdata[0].sede,
            rut: this.userdata[0].rut,
            patente: this.userdata[0].patente,
            password: this.userdata[0].password
          };

        }
      });
    }
  }

  MostrarMenu(){
    this.menuController.open('first')

  }

  Confirmar() {
    console.log('Confirmado')
  }

}
