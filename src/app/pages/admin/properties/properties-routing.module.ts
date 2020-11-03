import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertiesListComponent } from './properties-list.component';
import { PropertiesAddEditComponent } from './properties-add-edit.component';
import { PropertyDetailPage } from './property-detail/property-detail';

const routes: Routes = [
    { path: '', component: PropertiesListComponent },
    { path: 'add', component: PropertiesAddEditComponent },
    { path: 'property/:id', component: PropertiesAddEditComponent },
    { path: 'property-test/:id', component: PropertyDetailPage }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PropertiesRoutingModule { }
