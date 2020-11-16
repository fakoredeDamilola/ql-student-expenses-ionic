import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PropertyManager } from './property-manager';
import { PropertyManagerRoutingModule } from './property-manager-routing.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PropertyManagerRoutingModule
  ],
  declarations: [
    PropertyManager,
  ]
})
export class PropertyManagerModule { }
