import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesListComponent } from './properties-list.component';
import { PropertiesAddEditComponent } from './properties-add-edit.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        PropertiesRoutingModule
    ],
    declarations: [
        PropertiesListComponent,
        PropertiesAddEditComponent
    ]
})
export class PropertiesModule { }
