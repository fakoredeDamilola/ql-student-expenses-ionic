import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Admin } from "./admin";
import { AccountsPage } from "./accounts/accounts";

const routes: Routes = [
  {
    path: "",
    component: Admin,
    children: [
      {
        path: "accounts",
            loadChildren: () =>
              import("@app/pages/admin/accounts/accounts.module").then(
                (m) => m.AccountsModule
              ),
      },
      {
        path: "properties",
        loadChildren: () =>
          import("@app/pages/admin/properties/properties.module").then(
            (m) => m.PropertiesModule
          ),
      },
      {
        path: "pets",
        loadChildren: () =>
          import("@app/pages/admin//pets/pets.module").then(
            (m) => m.PetsModule
          ),
      },
      { path: "", redirectTo: "/admin/accounts", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
