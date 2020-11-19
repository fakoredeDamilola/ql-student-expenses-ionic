import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddPetOwnerPage } from './add-pet-owner';
import { AddPetOwnerPageRoutingModule } from './add-pet-owner-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPetOwnerPageRoutingModule
  ],
  declarations: [
    AddPetOwnerPage,
  ]
})
export class AddPetOwnerModule { }
