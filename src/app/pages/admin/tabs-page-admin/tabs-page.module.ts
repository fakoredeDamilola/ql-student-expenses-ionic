import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';


import { AccountsModule } from '../accounts/accounts.module';
import { AccountDetailModule } from '../accounts/account-detail/account-detail.module';
import { SpeakerDetailModule } from '../../speaker-detail/speaker-detail.module';
import { SpeakerListModule } from '../../speaker-list/speaker-list.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountsModule,
    AccountDetailModule,
    SpeakerDetailModule,
    SpeakerListModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class AdminTabsModule { }
