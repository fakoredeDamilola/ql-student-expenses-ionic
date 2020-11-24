import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetOwnerDetailsPage } from './pet-owner-details';
import { PetOwnerDetailsPageRoutingModule } from './pet-owner-details-routing.module';
import { IonicModule } from '@ionic/angular';
import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PetOwnerDetailsPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [
    PetOwnerDetailsPage,
  ]
})
export class PetOwnerDetailsModule { }
