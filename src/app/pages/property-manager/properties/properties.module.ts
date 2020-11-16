import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PropertiesListPage } from './properties';
import { PropertiesListPageRoutingModule } from './properties-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PropertiesListPageRoutingModule
  ],
  declarations: [PropertiesListPage],
})
export class PropertiesListModule {}
