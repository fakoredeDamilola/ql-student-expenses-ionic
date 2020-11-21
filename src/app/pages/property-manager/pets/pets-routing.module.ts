import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PetsListPage } from "./pets";
const routes: Routes = [
  {
    path: "",
    component: PetsListPage,
  },
  {
    path: "add",
    loadChildren: () =>
      import(
        "@app/pages/property-manager/properties/add-property/add-property.module"
      ).then((m) => m.AddPropertyModule),
  },
  {
    path: "pet-details/:petId",
    loadChildren: () =>
      import(
        "@app/pages/property-manager/pets/pet-details/pet-details.module"
      ).then((m) => m.PetDetailsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsListPageRoutingModule {}