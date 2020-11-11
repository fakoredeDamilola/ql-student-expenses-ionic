import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PetsListPage } from './pets-list';
const routes: Routes = [
  {
    path: '',
    component: PetsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsListPageRoutingModule {}
