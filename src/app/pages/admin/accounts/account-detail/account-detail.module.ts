import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountDetailPage } from './account-detail';
import { AccountDetailPageRoutingModule } from './account-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountDetailPageRoutingModule
  ],
  declarations: [
    AccountDetailPage,
  ]
})
export class AccountDetailModule { }
