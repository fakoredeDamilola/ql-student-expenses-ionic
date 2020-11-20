import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyDetailsPage } from './pet-details';
import { PropertyDetailsPageRoutingModule } from './pet-details-routing.module';
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
