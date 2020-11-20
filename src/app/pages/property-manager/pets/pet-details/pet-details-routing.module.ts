import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PetDetailsPage } from './pet-details';

const routes: Routes = [
  {
    path: '',
    component: PetDetailsPage
  },
  {
    path: "pet-owner/add",
    loadChildren: () =>
      import(
        "@app/pages/property-manager/pet-owners/add-pet-owner/add-pet-owner.module"
      ).then((m) => m.AddPetOwnerModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetDetailsPageRoutingModule { }
