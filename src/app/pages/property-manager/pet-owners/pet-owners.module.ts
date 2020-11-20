import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PetOwnersListPage } from './pet-owners';
import { PetOwnersListPageRoutingModule } from './pet-owners-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PetOwnersListPageRoutingModule
  ],
  declarations: [PetOwnersListPage],
})
export class PetOwnersListModule {}
