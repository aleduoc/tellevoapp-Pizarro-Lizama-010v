import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-viajar',
  templateUrl: './viajar.page.html',
  styleUrls: ['./viajar.page.scss'],
})
export class ViajarPage implements OnInit {

  mostrarCarga: boolean = false;

  constructor(private menuController: MenuController){ }

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
