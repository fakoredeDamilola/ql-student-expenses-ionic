import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetOwnersListComponent } from './pet-owners-list.component';
import { PetOwnersAddEditComponent } from './pet-owners-add-edit.component';

const routes: Routes = [
    { path: '', component: PetOwnersListComponent },
    { path: 'add', component: PetOwnersAddEditComponent },
    { path: 'edit/:id', component: PetOwnersAddEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PetOwnersRoutingModule { }