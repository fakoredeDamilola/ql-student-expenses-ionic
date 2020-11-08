import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPropertyManagerPage } from './tabs-page';
import { TabsPagePropertyManagerRoutingModule } from './tabs-page-routing.module';

import { AccountsModule } from '../../admin/accounts/accounts.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountsModule,
    TabsPagePropertyManagerRoutingModule
  ],
  declarations: [
    TabsPropertyManagerPage,
  ]
})
export class TabsPropertyManagerModule { }
