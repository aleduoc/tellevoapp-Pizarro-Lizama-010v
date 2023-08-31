import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPasajPageRoutingModule } from './register-pasaj-routing.module';

import { RegisterPasajPage } from './register-pasaj.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPasajPageRoutingModule
  ],
  declarations: [RegisterPasajPage]
})
export class RegisterPasajPageModule {}
