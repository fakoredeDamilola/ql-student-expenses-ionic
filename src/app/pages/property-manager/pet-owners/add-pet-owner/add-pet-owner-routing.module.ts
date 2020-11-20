import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPetOwnerPage } from './add-pet-owner';

const routes: Routes = [
  {
    path: '',
    component: AddPetOwnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPetOwnerPageRoutingModule { }
