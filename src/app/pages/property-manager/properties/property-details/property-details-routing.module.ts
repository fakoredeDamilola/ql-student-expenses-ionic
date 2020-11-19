import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PropertyDetailsPage } from './property-details';

const routes: Routes = [
  {
    path: '',
    component: PropertyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyDetailsPageRoutingModule { }
