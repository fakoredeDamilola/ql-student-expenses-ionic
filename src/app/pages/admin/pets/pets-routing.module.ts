import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PetsPage } from './pets';

const routes: Routes = [
  {
    path: '',
    component: PetsPage
  },
  {
    path: "pet-details/:petId",
    loadChildren: () =>
      import(
        "@app/pages/admin/pets/pet-details/pet-details.module"
      ).then((m) => m.PetDetailsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsPageRoutingModule { }
