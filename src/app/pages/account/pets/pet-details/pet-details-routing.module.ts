import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PetDetailsPage } from './pet-details';

const routes: Routes = [
  {
    path: '',
    component: PetDetailsPage
  },
  {
    path: "add-image",
    loadChildren: () =>
      import("@app/pages/account/pets/pet-details/pet-image/pet-image.module").then(
        (m) => m.PetImagePageModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetDetailsPageRoutingModule { }
