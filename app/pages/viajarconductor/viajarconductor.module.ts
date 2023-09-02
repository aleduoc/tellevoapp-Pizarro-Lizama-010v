import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajarconductorPageRoutingModule } from './viajarconductor-routing.module';

import { ViajarconductorPage } from './viajarconductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajarconductorPageRoutingModule
  ],
  declarations: [ViajarconductorPage]
})
export class ViajarconductorPageModule {}
