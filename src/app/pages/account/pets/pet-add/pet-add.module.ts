import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetAddPage } from './pet-add';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PetAddPageRoutingModule } from './pet-add-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetAddPageRoutingModule
  ],
  declarations: [
    PetAddPage,
  ]
})
export class PetAddModule { }
