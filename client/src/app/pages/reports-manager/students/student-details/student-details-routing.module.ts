import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StudentDetailsPage } from "./student-details";

const routes: Routes = [
  {
    path: "",
    component: StudentDetailsPage,
  },
  {
    path: "student-expenses/expense-details/:expenseId",
    loadChildren: () =>
      import(
        "@app/pages/reports-manager/expenses/expense-details/expense-details.module"
      ).then((m) => m.ExpenseDetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentDetailsPageRoutingModule {}
