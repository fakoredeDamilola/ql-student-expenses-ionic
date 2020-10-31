import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesListComponent } from './properties-list.component';
import { PropertiesAddEditComponent } from './properties-add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PropertiesRoutingModule
    ],
    declarations: [
        PropertiesListComponent,
        PropertiesAddEditComponent
    ]
})
export class PropertiesModule { }