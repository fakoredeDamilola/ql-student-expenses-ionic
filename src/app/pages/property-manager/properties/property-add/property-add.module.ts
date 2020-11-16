import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyAddPage } from './property-add';
import { PropertyAddPageRoutingModule } from './property-add-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertyAddPageRoutingModule
  ],
  declarations: [
    PropertyAddPage,
  ]
})
export class PropertyAddModule { }
