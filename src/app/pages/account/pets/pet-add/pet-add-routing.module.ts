import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PetAddPage } from './pet-add';

const routes: Routes = [
  {
    path: '',
    component: PetAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetAddPageRoutingModule { }
