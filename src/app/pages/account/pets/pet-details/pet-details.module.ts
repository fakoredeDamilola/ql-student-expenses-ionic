import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetDetailsPage } from './pet-details';
import { PetDetailsPageRoutingModule } from './pet-details-routing.module';
import { IonicModule } from '@ionic/angular';

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
