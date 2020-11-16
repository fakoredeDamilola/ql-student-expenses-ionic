import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyDetailsPage } from './property-details';
import { PropertyDetailsPageRoutingModule } from './property-details-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PropertyDetailsPageRoutingModule
  ],
  declarations: [
    PropertyDetailsPage,
  ]
})
export class PropertyDetailsModule { }
