import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PetsListPage } from './pets-list';
const routes: Routes = [
  {
    path: '',
    component: PetsListPage
  },
  {
    path: "pet-details/:petId",
    loadChildren: () =>
      import("@app/pages/account/pets/pet-details/pet-details.module").then(
        (m) => m.PetDetailsModule
      ),
  },
  {
    path: "add",
    loadChildren: () =>
      import("@app/pages/account/pets/pet-add/pet-add.module").then(
        (m) => m.PetAddModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsListPageRoutingModule {}
