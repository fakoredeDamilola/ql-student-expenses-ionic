import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPropertyPage } from './add-property';
import { AddPropertyPageRoutingModule } from './add-property-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPropertyPageRoutingModule
  ],
  declarations: [
    AddPropertyPage,
  ]
})
export class AddPropertyModule { }
