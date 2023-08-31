import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPasajPage } from './register-pasaj.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPasajPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPasajPageRoutingModule {}
