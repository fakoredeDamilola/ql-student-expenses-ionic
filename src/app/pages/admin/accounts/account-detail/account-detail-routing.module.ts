import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountDetailPage } from './account-detail';

const routes: Routes = [
  {
    path: '',
    component: AccountDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountDetailPageRoutingModule { }
