import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { PetOwnersListPage } from './pet-owners';
import { PetOwnersListPageRoutingModule } from './pet-owners-routing.module';
import { PetOwnersFilterPage } from './pet-owners-filter/pet-owners-filter';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PetOwnersListPageRoutingModule,
    FormsModule
  ],
  declarations: [
    PetOwnersListPage,
    PetOwnersFilterPage
  ],
  entryComponents: [
    PetOwnersFilterPage
  ]
})
export class PetOwnersListModule {}
