import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ExpenseDetailsPage } from "./expense-details";

const routes: Routes = [
  {
    path: "",
    component: ExpenseDetailsPage,
  },
  {
    path: "add-image",
    loadChildren: () =>
      import(
        "@app/pages/account/expenses/expense-image/expense-image.module"
      ).then((m) => m.ExpenseImagePageModule),
  },
  {
    path: "report-details/:reportId",
    loadChildren: () =>
      import(
        "@app/pages/reports-manager/reports/report-details/report-details.module"
      ).then((m) => m.ReportDetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseDetailsPageRoutingModule {}
