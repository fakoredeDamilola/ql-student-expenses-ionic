import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ExpensesListPage } from './expenses';
import { ExpensesListPageRoutingModule } from './expenses-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    ExpensesListPageRoutingModule
  ],
  declarations: [ExpensesListPage],
})
export class ExpensesListModule {}
