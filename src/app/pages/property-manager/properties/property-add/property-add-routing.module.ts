import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PropertyAddPage } from './property-add';

const routes: Routes = [
  {
    path: '',
    component: PropertyAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyAddPageRoutingModule { }
