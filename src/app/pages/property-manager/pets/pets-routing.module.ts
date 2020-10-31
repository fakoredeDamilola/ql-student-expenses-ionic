import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsListComponent } from './pets-list.component';
import { PetsAddEditComponent } from './pets-add-edit.component';

const routes: Routes = [
    { path: '', component: PetsListComponent },
    { path: 'add', component: PetsAddEditComponent },
    { path: 'edit/:id', component: PetsAddEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PetsRoutingModule { }