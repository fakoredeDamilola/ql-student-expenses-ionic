import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PetDetailPage } from './pet-detail';

const routes: Routes = [
  {
    path: '',
    component: PetDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetDetailPageRoutingModule { }
