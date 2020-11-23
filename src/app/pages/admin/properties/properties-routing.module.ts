import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PropertiesPage } from './properties';

const routes: Routes = [
  {
    path: '',
    component: PropertiesPage
  },
  {
    path: "property-details/:propertyId",
    loadChildren: () =>
      import(
        "@app/pages/admin/properties/property-details/property-details.module"
      ).then((m) => m.PropertyDetailsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesPageRoutingModule { }
