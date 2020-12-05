import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseDetailsPage } from './expense-details';
import { ExpenseDetailsPageRoutingModule } from './expense-details-routing.module';
import { IonicModule } from '@ionic/angular';

import { IonicRatingModule } from 'ionic-rating';

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
