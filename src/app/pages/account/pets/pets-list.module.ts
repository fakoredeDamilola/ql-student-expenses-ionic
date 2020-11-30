import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonicRatingModule } from 'ionic-rating';
import { FormsModule } from '@angular/forms';
import { PetsListPage } from './pets-list';
import { PetsListPageRoutingModule } from './pets-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PetsListPageRoutingModule,
    IonicRatingModule,
    FormsModule
  ],
  declarations: [PetsListPage],
})
export class PetsListModule {}
