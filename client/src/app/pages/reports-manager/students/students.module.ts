import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { StudentsListPage } from './students';
import { StudentsListPageRoutingModule } from './students-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    StudentsListPageRoutingModule,
    FormsModule
  ],
  declarations: [
    StudentsListPage,
  ],
  entryComponents: [
  ]
})
export class StudentsListModule {}
