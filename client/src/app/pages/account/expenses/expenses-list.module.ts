import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ExpensesListPage } from './expenses-list';
import { ExpensesListPageRoutingModule } from './expenses-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ExpensesListPageRoutingModule,
    FormsModule
  ],
  declarations: [ExpensesListPage],
})
export class ExpensesListModule {}
