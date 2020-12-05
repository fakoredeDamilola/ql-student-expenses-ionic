import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonicRatingModule } from 'ionic-rating';
import { FormsModule } from '@angular/forms';

import { ExpensesListPage } from './expenses';
import { ExpensesListPageRoutingModule } from './expenses-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    ExpensesListPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [ExpensesListPage],
})
export class ExpensesListModule {}
