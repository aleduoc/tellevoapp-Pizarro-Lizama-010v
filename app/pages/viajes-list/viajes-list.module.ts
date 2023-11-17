import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajesListPageRoutingModule } from './viajes-list-routing.module';

import { ViajesListPage } from './viajes-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajesListPageRoutingModule
  ],
  declarations: [ViajesListPage]
})
export class ViajesListPageModule {}
