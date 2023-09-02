import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipouserisPageRoutingModule } from './tipouseris-routing.module';

import { TipouserisPage } from './tipouseris.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipouserisPageRoutingModule
  ],
  declarations: [TipouserisPage]
})
export class TipouserisPageModule {}
