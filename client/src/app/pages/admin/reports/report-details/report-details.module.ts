import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportDetailsPage } from './report-details';
import { ReportDetailsPageRoutingModule } from './report-details-routing.module';
import { IonicModule } from '@ionic/angular';

import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReportDetailsPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [
    ReportDetailsPage,
  ]
})
export class ReportDetailsModule { }
