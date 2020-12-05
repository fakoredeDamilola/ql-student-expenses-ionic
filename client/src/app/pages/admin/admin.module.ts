import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonicRatingModule } from 'ionic-rating';

import { Admin } from './admin';
import { AdminRoutingModule } from './admin-routing.module';


import { AccountsModule } from './accounts/accounts.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountsModule,
    AdminRoutingModule,
    IonicRatingModule
  ],
  declarations: [
    Admin,
  ]
})
export class AdminModule { }
