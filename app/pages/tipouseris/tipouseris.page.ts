import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tipouseris',
  templateUrl: './tipouseris.page.html',
  styleUrls: ['./tipouseris.page.scss'],
})
export class TipouserisPage implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {
  }

  MostrarMenu(){
    this.menuController.open('first')

  }

}
