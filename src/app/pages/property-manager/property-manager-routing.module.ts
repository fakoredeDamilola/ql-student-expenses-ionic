import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PropertyManager } from './property-manager';


const routes: Routes = [
  {
    path: "",
    component: PropertyManager,
    children: [
      {
        path: "properties",
            loadChildren: () =>
              import("@app/pages/property-manager/properties/properties.module").then(
                (m) => m.PropertiesListModule
              ),
      },
      {
        path: "pet-owners",
            loadChildren: () =>
              import("@app/pages/property-manager/pet-owners/pet-owners.module").then(
                (m) => m.PetOwnersListModule
              ),
      },
      {
        path: "pets",
            loadChildren: () =>
              import("@app/pages/property-manager/pets/pets.module").then(
                (m) => m.PetsListModule
              ),
      },
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyManagerRoutingModule {}
