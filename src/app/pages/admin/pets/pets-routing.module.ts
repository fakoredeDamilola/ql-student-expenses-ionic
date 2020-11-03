import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsListComponent } from './pets-list.component';
import { PetsAddEditComponent } from './pets-add-edit.component';
//import { PropertyDetailPage } from './property-detail/property-detail';

const routes: Routes = [
    { path: '', component: PetsListComponent },
    { path: 'add', component: PetsAddEditComponent },
    { path: 'pet/:id', component: PetsAddEditComponent },
    //{ path: 'property-test/:id', component: PropertyDetailPage }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PetsRoutingModule { }
