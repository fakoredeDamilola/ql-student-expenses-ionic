import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PetsRoutingModule } from './pets-routing.module';
import { PetsListComponent } from './pets-list.component';
import { PetsAddEditComponent } from './pets-add-edit.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        PetsRoutingModule
    ],
    declarations: [
        PetsListComponent,
        PetsAddEditComponent
    ]
})
export class PetsModule { }
