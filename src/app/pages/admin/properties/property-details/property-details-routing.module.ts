import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PropertyDetailsPage } from './property-details';

const routes: Routes = [
  {
    path: '',
    component: PropertyDetailsPage
  },
  {
    path: "pets/pet-details/:petId",
    loadChildren: () =>
      import("@app/pages/account/pets/pet-details/pet-details.module").then(
        (m) => m.PetDetailsModule
      ),
  },
  {
    path: "properties",
        loadChildren: () =>
          import("@app/pages/property-manager/properties/properties.module").then(
            (m) => m.PropertiesListModule
          ),
  },
  {
    path: "pet-owners",
        loadChildren: () =>
          import("@app/pages/property-manager/pet-owners/pet-owners.module").then(
            (m) => m.PetOwnersListModule
          ),
  },
  {
    path: "properties-pets",
        loadChildren: () =>
          import("@app/pages/property-manager/pets/pets.module").then(
            (m) => m.PetsListModule
          ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyDetailsPageRoutingModule { }
