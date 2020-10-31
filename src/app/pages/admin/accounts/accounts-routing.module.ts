import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountsPage } from './accounts';

const routes: Routes = [
  {
    path: '',
    component: AccountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsPageRoutingModule { }
