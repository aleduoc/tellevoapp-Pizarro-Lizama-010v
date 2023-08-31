import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterCondPageRoutingModule } from './register-cond-routing.module';

import { RegisterCondPage } from './register-cond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterCondPageRoutingModule
  ],
  declarations: [RegisterCondPage]
})
export class RegisterCondPageModule {}
