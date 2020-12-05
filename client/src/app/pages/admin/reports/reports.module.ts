import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ReportsPage } from './reports';
import { ReportsFilterPage } from './reports-filter/reports-filter';
import { ReportsPageRoutingModule } from './reports-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsPageRoutingModule
  ],
  declarations: [
    ReportsPage,
    ReportsFilterPage
  ],
  entryComponents: [
    ReportsFilterPage
  ]
})
export class ReportsModule { }
