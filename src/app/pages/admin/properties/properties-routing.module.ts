import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertiesListComponent } from './properties-list.component';
import { PropertiesAddEditComponent } from './properties-add-edit.component';

const routes: Routes = [
    { path: '', component: PropertiesListComponent },
    { path: 'add', component: PropertiesAddEditComponent },
    { path: 'edit/:id', component: PropertiesAddEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PropertiesRoutingModule { }