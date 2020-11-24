import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PropertyDetailsPage } from './property-details';

const routes: Routes = [
  {
    path: '',
    component: PropertyDetailsPage
  },
  {
    path: "pet-owner/add",
    loadChildren: () =>
      import(
        "@app/pages/property-manager/pet-owners/add-pet-owner/add-pet-owner.module"
      ).then((m) => m.AddPetOwnerModule),
  },
  {
    path: "pet-owner/details",
    loadChildren: () =>
      import(
        "@app/pages/property-manager/pet-owners/pet-owner-details/pet-owner-details.module"
      ).then((m) => m.PetOwnerDetailsModule),
  },
  {
    path: "property-pets/pet-details/:petId",
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
export class PropertyDetailsPageRoutingModule { }
