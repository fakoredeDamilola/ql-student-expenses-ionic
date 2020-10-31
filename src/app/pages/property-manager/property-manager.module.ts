import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PropertyManagerRoutingModule } from './property-manager-routing.module';
import { PropertyManagerSubNavComponent } from './property-manager-subnav.component';
import { PropertyManagerLayoutComponent } from './property-manager-layout.component';
import { PropertyManagerOverviewComponent } from './property-manager-overview.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PropertyManagerRoutingModule
    ],
    declarations: [
        PropertyManagerSubNavComponent,
        PropertyManagerLayoutComponent,
        PropertyManagerOverviewComponent
    ]
})
export class PropertyManagerModule { }