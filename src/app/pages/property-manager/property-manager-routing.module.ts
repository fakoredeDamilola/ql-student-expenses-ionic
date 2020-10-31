import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyManagerSubNavComponent } from './property-manager-subnav.component';
import { PropertyManagerLayoutComponent } from './property-manager-layout.component';
import { PropertyManagerOverviewComponent } from './property-manager-overview.component';

const propertiesModule = () => import('./properties/properties.module').then(x => x.PropertiesModule);
const petOwnersModule = () => import('./pet-owners/pet-owners.module').then(y => y.PetOwnersModule);
const petsModule = () => import('./pets/pets.module').then(z => z.PetsModule);


const routes: Routes = [
    { path: '', component: PropertyManagerSubNavComponent, outlet: 'subnav' },
    {
        path: '', component: PropertyManagerLayoutComponent,
        children: [
            { path: '', component: PropertyManagerOverviewComponent },
            { path: 'properties', loadChildren: propertiesModule },
            { path: 'pet-owners', loadChildren: petOwnersModule },
            { path: 'pets', loadChildren: petsModule },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PropertyManagerRoutingModule { }