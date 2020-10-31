import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PetOwnersRoutingModule } from './pet-owners-routing.module';
import { PetOwnersListComponent } from './pet-owners-list.component';
import { PetOwnersAddEditComponent } from './pet-owners-add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PetOwnersRoutingModule
    ],
    declarations: [
        PetOwnersListComponent,
        PetOwnersAddEditComponent
    ]
})
export class PetOwnersModule { }