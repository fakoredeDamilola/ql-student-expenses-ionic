import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ReportsListPage } from "./reports";
const routes: Routes = [
  {
    path: "",
    component: ReportsListPage,
  },
  {
    path: "add",
    loadChildren: () =>
      import(
        "@app/pages/reports-manager/reports/add-report/add-report.module"
      ).then((m) => m.AddReportModule),
  },
  {
    path: "report-details/:reportId",
    loadChildren: () =>
      import(
        "@app/pages/reports-manager/reports/report-details/report-details.module"
      ).then((m) => m.ReportDetailsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsListPageRoutingModule {}
