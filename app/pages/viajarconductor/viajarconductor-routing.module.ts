import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajarconductorPage } from './viajarconductor.page';

const routes: Routes = [
  {
    path: '',
    component: ViajarconductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajarconductorPageRoutingModule {}
