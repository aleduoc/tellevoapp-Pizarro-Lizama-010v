import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.page.html',
  styleUrls: ['./viajes-list.page.scss'],
})
export class ViajesListPage implements OnInit {

  detalle ={
    id:0,
    email:"",
    direccion:"",
    precio:"",
    nota:"",
    patente:"",
  }

  constructor(private router: Router,
              private authservice: AuthService) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.getViajeById(this.getIdFromUrl());
  }

  getIdFromUrl(){
    let url=this.router.url;
    let arr=url.split("/",3);
    let id = parseInt(arr[2]);
    return id;
  }

  getViajeById(id:number){
    this.authservice.getViajeWithId(id).subscribe(
      (resp:any)=>{                 //resp llega en formato de arreglo de un objeto 
        this.detalle={
          id: resp[0].id,
          email: resp[0].email,
          direccion: resp[0].direccion,
          precio: resp[0].precio,
          nota: resp[0].nota,
          patente: resp[0].patente
        }
      }
    )
  }

}
