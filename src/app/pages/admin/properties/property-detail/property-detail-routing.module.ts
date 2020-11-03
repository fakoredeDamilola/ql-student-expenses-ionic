import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PropertyDetailPage } from './property-detail';

const routes: Routes = [
  {
    path: '',
    component: PropertyDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyDetailPageRoutingModule { }
