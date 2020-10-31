import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPropertyManagerPage } from './tabs-page';
import { TabsPagePropertyManagerRoutingModule } from './tabs-page-routing.module';

import { AboutModule } from '../../about/about.module';
import { AccountsModule } from '../../admin/accounts/accounts.module';
//import { SessionDetailModule } from '../../session-detail/session-detail.module';
import { SpeakerDetailModule } from '../../speaker-detail/speaker-detail.module';
import { SpeakerListModule } from '../../speaker-list/speaker-list.module';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    AccountsModule,
    //SessionDetailModule,
    SpeakerDetailModule,
    SpeakerListModule,
    TabsPagePropertyManagerRoutingModule
  ],
  declarations: [
    TabsPropertyManagerPage,
  ]
})
export class TabsPropertyManagerModule { }
