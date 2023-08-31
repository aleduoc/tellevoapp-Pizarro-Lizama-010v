import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tipo-user',
  templateUrl: './tipo-user.page.html',
  styleUrls: ['./tipo-user.page.scss'],
})
export class TipoUserPage implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {
  }

  MostrarMenu(){
    this.menuController.open('first')

  }

}
