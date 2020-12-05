import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicRatingModule } from 'ionic-rating';

import { ExpenseDetailsPage } from './expense-details';
import { IonicModule } from '@ionic/angular';
import { ExpenseDetailsPageRoutingModule } from '@app/pages/account/expenses/expense-details/expense-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ExpenseDetailsPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [
    ExpenseDetailsPage,
  ]
})
export class ExpenseDetailsModule { }
