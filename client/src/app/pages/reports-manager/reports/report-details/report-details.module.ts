import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportDetailsPage } from './report-details';
import { ReportDetailsPageRoutingModule } from './report-details-routing.module';
import { IonicModule } from '@ionic/angular';


import { IonicRatingModule } from 'ionic-rating';
import { MinusPipe } from '@app/minus.pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReportDetailsPageRoutingModule,
    IonicRatingModule,
    MinusPipe
  ],
  declarations: [
    ReportDetailsPage,
    MinusPipe
  ]
})
export class ReportDetailsModule { }
