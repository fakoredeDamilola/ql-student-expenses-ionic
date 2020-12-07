import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VerifyEmailComponent } from "@app/pages/account/verify-email/verify-email.component";
import { AuthGuard } from "@app/_helpers";
import { Role } from "@app/_models";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("@app/pages/home/home.module").then((x) => x.HomePageModule),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("@app/pages/admin/admin.module").then((m) => m.AdminModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: "account/profile",
    loadChildren: () =>
      import("@app/pages/profile/profile.module").then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: "account/expenses",
    loadChildren: () =>
      import("@app/pages/account/expenses/expenses-list.module").then(
        (m) => m.ExpensesListModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    loadChildren: () =>
      import("@app/pages/account/login/login.module").then(
        (m) => m.LoginModule
      ),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("@app/pages/account/signup/signup.module").then(
        (m) => m.SignUpModule
      ),
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("@app/pages/account/forgot-password/forgot-password.module").then(
        (m) => m.ForgotPasswordModule
      ),
  },
  { path: "account/verify-email", component: VerifyEmailComponent },
  {
    path: "reports-manager",
    loadChildren: () =>
      import("@app/pages/reports-manager/reports-manager.module").then(
        (m) => m.ReportsManagerModule
      ),
  },
  {
    path: "account/reset-password",
    loadChildren: () =>
      import("@app/pages/account/reset-password/reset-password.module").then(
        (m) => m.ResetPasswordModule
      ),
  },
  {
    path: "support",
    loadChildren: () =>
      import("@app/pages/support/support.module").then((m) => m.SupportModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
