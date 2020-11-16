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
              import("../property-manager/properties/properties.module").then(
                (m) => m.PropertiesListModule
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
