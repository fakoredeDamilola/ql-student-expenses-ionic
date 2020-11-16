import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PropertiesListPage } from './properties';
const routes: Routes = [
  {
    path: '',
    component: PropertiesListPage
  },
 {
    path: "property-details/:propertyId",
    loadChildren: () =>
      import("@app/pages/property-manager/properties/property-detail/property-details.module").then(
        (m) => m.PropertyDetailsModule
      ),
  },
  {
    path: "add",
    loadChildren: () =>
      import("@app/pages/property-manager/properties/property-add/property-add.module").then(
        (m) => m.PropertyAddModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesListPageRoutingModule {}
