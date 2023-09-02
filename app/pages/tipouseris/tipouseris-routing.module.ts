import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipouserisPage } from './tipouseris.page';

const routes: Routes = [
  {
    path: '',
    component: TipouserisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipouserisPageRoutingModule {}
