import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyDetailPage } from './property-detail';
import { PropertyDetailPageRoutingModule } from './property-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PropertyDetailPageRoutingModule
  ],
  declarations: [
    PropertyDetailPage,
  ]
})
export class PropertyDetailModule { }
