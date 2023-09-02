import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-viajarconductor',
  templateUrl: './viajarconductor.page.html',
  styleUrls: ['./viajarconductor.page.scss'],
})
export class ViajarconductorPage implements OnInit {

  mostrarCarga: boolean = false;

  constructor(private menuController: MenuController) { }

  ngOnInit() {
  }

  MostrarMenu(){
    this.menuController.open('first');
  }

  Viajar() {
    this.mostrarCarga = true;
    setTimeout(() => {
      this.mostrarCarga = false;
    }, 4000);
  }
}

