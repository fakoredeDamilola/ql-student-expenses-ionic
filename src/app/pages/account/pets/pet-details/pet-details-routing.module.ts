import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PetDetailsPage } from './pet-details';

const routes: Routes = [
  {
    path: '',
    component: PetDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetDetailsPageRoutingModule { }
