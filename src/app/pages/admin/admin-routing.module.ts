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
          import("./properties/properties.module").then(
            (m) => m.PropertiesModule
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
