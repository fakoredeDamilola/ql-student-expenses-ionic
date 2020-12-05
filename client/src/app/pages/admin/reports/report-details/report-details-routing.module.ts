import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportDetailsPage } from './report-details';

const routes: Routes = [
  {
    path: '',
    component: ReportDetailsPage
  },
  {
    path: "expenses/expense-details/:expenseId",
    loadChildren: () =>
      import("@app/pages/account/expenses/expense-details/expense-details.module").then(
        (m) => m.ExpenseDetailsModule
      ),
  },
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
    path: "students/add",
    loadChildren: () =>
      import(
        "@app/pages/reports-manager/students/add-student/add-student.module"
      ).then((m) => m.AddStudentModule),
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
  exports: [RouterModule]
})
export class ReportDetailsPageRoutingModule { }
