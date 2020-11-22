import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicRatingModule } from 'ionic-rating';

import { PetDetailsPage } from './pet-details';
import { IonicModule } from '@ionic/angular';
import { PetDetailsPageRoutingModule } from '@app/pages/account/pets/pet-details/pet-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PetDetailsPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [
    PetDetailsPage,
  ]
})
export class PetDetailsModule { }
