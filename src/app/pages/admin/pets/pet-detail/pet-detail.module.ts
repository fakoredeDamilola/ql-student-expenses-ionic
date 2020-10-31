import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetDetailPage } from './pet-detail';
import { PetDetailPageRoutingModule } from './pet-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PetDetailPageRoutingModule
  ],
  declarations: [
    PetDetailPage,
  ]
})
export class PetDetailModule { }
