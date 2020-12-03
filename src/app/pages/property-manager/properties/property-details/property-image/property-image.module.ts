import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyImagePage } from './property-image';
import { ExploreContainerComponentModule } from '@app/explore-container/explore-container.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: PropertyImagePage }])
  ],
  declarations: [PropertyImagePage]
})
export class PropertyImagePageModule {}
