import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PetOwnerDetailsPage } from './pet-owner-details';

const routes: Routes = [
  {
    path: '',
    component: PetOwnerDetailsPage
  },
  {
    path: "pet-owner-pets/pet-details/:petId",
    loadChildren: () =>
      import(
        "@app/pages/property-manager/pets/pet-details/pet-details.module"
      ).then((m) => m.PetDetailsModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetOwnerDetailsPageRoutingModule { }
