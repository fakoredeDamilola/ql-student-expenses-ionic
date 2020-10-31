import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PetsRoutingModule } from './pets-routing.module';
import { PetsListComponent } from './pets-list.component';
import { PetsAddEditComponent } from './pets-add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PetsRoutingModule
    ],
    declarations: [
        PetsListComponent,
        PetsAddEditComponent
    ]
})
export class PetsModule { }