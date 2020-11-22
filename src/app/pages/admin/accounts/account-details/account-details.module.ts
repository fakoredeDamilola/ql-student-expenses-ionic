import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountDetailsPage } from './account-details';
import { AccountDetailsPageRoutingModule } from './account-details-routing.module';
import { IonicModule } from '@ionic/angular';

import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountDetailsPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [
    AccountDetailsPage,
  ]
})
export class AccountDetailsModule { }
