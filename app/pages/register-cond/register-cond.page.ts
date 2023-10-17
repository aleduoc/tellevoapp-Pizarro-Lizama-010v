import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';
import { IConductor } from '../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-cond',
  templateUrl: './register-cond.page.html',
  styleUrls: ['./register-cond.page.scss'],
})
export class RegisterCondPage implements OnInit {

  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private router: Router,
              private apicrud: ApiCrudService) { }

  NewConductor: IConductor = {
    email: '',
    sede: '',
    rut: '',
    patente: '',
    password: '',
  }

  ngOnInit() {
  }

  MostrarMenu(){
    this.menuController.open('first')

  }

  Confirmar() {
    console.log('Confirmado')
  }

  crearChofer() {
    this.apicrud.crearConductor(this.NewConductor).subscribe();
  }

}
