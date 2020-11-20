import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPropertyPage } from './add-property';

const routes: Routes = [
  {
    path: '',
    component: AddPropertyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPropertyPageRoutingModule { }
