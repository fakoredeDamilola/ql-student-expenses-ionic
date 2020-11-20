import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PetOwnersListPage } from "./pet-owners";
const routes: Routes = [
  {
    path: "",
    component: PetOwnersListPage,
  },
  {
    path: "add",
    loadChildren: () =>
      import(
        "@app/pages/property-manager/pet-owners/add-pet-owner/add-pet-owner.module"
      ).then((m) => m.AddPetOwnerModule),
  },
  {
    path: "pet-owner-details/:petOwnerId",
    loadChildren: () =>
      import(
        "@app/pages/property-manager/pet-owners/pet-owner-details/pet-owner-details.module"
      ).then((m) => m.PetOwnerDetailsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetOwnersListPageRoutingModule {}
