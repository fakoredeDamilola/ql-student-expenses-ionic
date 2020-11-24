import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { PropertiesListPage } from './properties';
import { PropertiesListPageRoutingModule } from './properties-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    PropertiesListPageRoutingModule
  ],
  declarations: [PropertiesListPage],
})
export class PropertiesListModule {}
