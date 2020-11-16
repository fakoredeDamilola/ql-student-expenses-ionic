import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetDetailsPage } from './pet-details';
import { IonicModule } from '@ionic/angular';
import { PetDetailsPageRoutingModule } from '@app/pages/account/pets/pet-details/pet-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PetDetailsPageRoutingModule
  ],
  declarations: [
    PetDetailsPage,
  ]
})
export class PetDetailsModule { }
