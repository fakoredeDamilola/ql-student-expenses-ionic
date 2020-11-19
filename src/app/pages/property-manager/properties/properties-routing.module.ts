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
        "@app/pages/property-manager/properties/property-add/property-add.module"
      ).then((m) => m.PropertyAddModule),
  },
  {
    path: "property-details/:propertyId",
    loadChildren: () =>
      import(
        "@app/pages/property-manager/properties/property-details/property-details.module"
      ).then((m) => m.PropertyDetailsModule),
  },
  {
    path: "property-details/:propertyId/pet-owner/add",
    loadChildren: () =>
      import(
        "@app/pages/property-manager/properties/add-pet-owner/add-pet-owner.module"
      ).then((m) => m.AddPetOwnerModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertiesListPageRoutingModule {}
