import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PetOwnerDetailsPage } from './pet-owner-details';

const routes: Routes = [
  {
    path: '',
    component: PetOwnerDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetOwnerDetailsPageRoutingModule { }
