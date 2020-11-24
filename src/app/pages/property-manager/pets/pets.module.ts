import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonicRatingModule } from 'ionic-rating';
import { FormsModule } from '@angular/forms';

import { PetsListPage } from './pets';
import { PetsListPageRoutingModule } from './pets-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    PetsListPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [PetsListPage],
})
export class PetsListModule {}
