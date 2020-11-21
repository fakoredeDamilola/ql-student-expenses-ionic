import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PropertiesListPage } from "./properties";
const routes: Routes = [
  {
    path: "",
    component: PropertiesListPage,
  },
  {
    path: "add",
    loadChildren: () =>
      import(
        "@app/pages/property-manager/properties/add-property/add-property.module"
      ).then((m) => m.AddPropertyModule),
  },
  {
    path: "property-details/:propertyId",
    loadChildren: () =>
      import(
        "@app/pages/property-manager/properties/property-details/property-details.module"
      ).then((m) => m.PropertyDetailsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertiesListPageRoutingModule {}