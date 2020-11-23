import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PetsPage } from './pets';
import { PetsFilterPage } from './pets-filter/pets-filter';
import { PetsPageRoutingModule } from './pets-routing.module';
import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetsPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [
    PetsPage,
    PetsFilterPage
  ],
  entryComponents: [
    PetsFilterPage
  ]
})
export class PetsModule { }
