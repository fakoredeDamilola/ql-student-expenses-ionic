import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpenseDetailsPage } from './expense-details';

const routes: Routes = [
  {
    path: '',
    component: ExpenseDetailsPage
  },
  {
    path: "student/add",
    loadChildren: () =>
      import(
        "@app/pages/reports-manager/students/add-student/add-student.module"
      ).then((m) => m.AddStudentModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseDetailsPageRoutingModule { }
