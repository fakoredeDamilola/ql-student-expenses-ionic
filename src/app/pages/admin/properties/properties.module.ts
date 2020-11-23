import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PropertiesPage } from './properties';
import { PropertiesFilterPage } from './properties-filter/properties-filter';
import { PropertiesPageRoutingModule } from './properties-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertiesPageRoutingModule
  ],
  declarations: [
    PropertiesPage,
    PropertiesFilterPage
  ],
  entryComponents: [
    PropertiesFilterPage
  ]
})
export class PropertiesModule { }
