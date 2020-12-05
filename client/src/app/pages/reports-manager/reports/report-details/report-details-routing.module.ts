import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportDetailsPage } from './report-details';

const routes: Routes = [
  {
    path: '',
    component: ReportDetailsPage
  },
  {
    path: "student/add",
    loadChildren: () =>
      import(
        "@app/pages/reports-manager/students/add-student/add-student.module"
      ).then((m) => m.AddStudentModule),
  },
  {
    path: "student/details",
    loadChildren: () =>
      import(
        "@app/pages/reports-manager/students/student-details/student-details.module"
      ).then((m) => m.StudentDetailsModule),
  },
  {
    path: "reports-expenses/expense-details/:expenseId",
    loadChildren: () =>
      import(
        "@app/pages/reports-manager/expenses/expense-details/expense-details.module"
      ).then((m) => m.ExpenseDetailsModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportDetailsPageRoutingModule { }
