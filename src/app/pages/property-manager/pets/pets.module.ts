import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonicRatingModule } from 'ionic-rating';

import { PetsListPage } from './pets';
import { PetsListPageRoutingModule } from './pets-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PetsListPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [PetsListPage],
})
export class PetsListModule {}
