import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajesListPage } from './viajes-list.page';

const routes: Routes = [
  {
    path: '',
    component: ViajesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajesListPageRoutingModule {}
