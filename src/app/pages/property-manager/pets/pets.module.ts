import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PetsListPage } from './pets';
import { PetsListPageRoutingModule } from './pets-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PetsListPageRoutingModule
  ],
  declarations: [PetsListPage],
})
export class PetsListModule {}
