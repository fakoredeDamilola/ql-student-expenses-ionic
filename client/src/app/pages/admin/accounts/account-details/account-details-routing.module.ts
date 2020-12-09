import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AccountDetailsPage } from "./account-details";

const routes: Routes = [
  {
    path: "",
    component: AccountDetailsPage,
  },
  {
    path: "expenses/add",
    loadChildren: () =>
      import("@app/pages/account/expenses/add-expense/add-expense.module").then(
        (m) => m.AddExpenseModule
      ),
  },
  {
    path: "expenses/expense-details/:expenseId",
    loadChildren: () =>
      import(
        "@app/pages/admin/expenses/expense-details/expense-details.module"
      ).then((m) => m.ExpenseDetailsModule),
  },
  // Bellow for reports manager view as them
  {
    path: "reports",
    loadChildren: () =>
      import("@app/pages/reports-manager/reports/reports.module").then(
        (m) => m.ReportsListModule
      ),
  },
  {
    path: "students",
    loadChildren: () =>
      import("@app/pages/reports-manager/students/students.module").then(
        (m) => m.StudentsListModule
      ),
  },
  {
    path: "reports-expenses",
    loadChildren: () =>
      import("@app/pages/reports-manager/expenses/expenses.module").then(
        (m) => m.ExpensesListModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountDetailsPageRoutingModule {}
