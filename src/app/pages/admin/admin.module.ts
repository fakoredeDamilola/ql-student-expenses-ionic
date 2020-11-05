import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Admin } from './admin';
import { AdminRoutingModule } from './admin-routing.module';


import { AccountsModule } from './accounts/accounts.module';
import { AccountDetailModule } from './accounts/account-detail/account-detail.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountsModule,
    AccountDetailModule,
    AdminRoutingModule
  ],
  declarations: [
    Admin,
  ]
})
export class AdminModule { }
