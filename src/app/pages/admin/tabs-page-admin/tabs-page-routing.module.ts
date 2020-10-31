import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { AccountsPage } from '../accounts/accounts';


const routes: Routes = [
  {
    path: 'admin',
    component: TabsPage,
    children: [
      {
        path: 'accounts',
        children: [
          {
            path: '',
            component: AccountsPage,
          },
          {
            path: 'account/:sessionId',
            loadChildren: () => import('../accounts/account-detail/account-detail.module').then(m => m.AccountDetailModule)
          }
        ]
      },
      {
        path: 'speakers',
        children: [
          {
            path: '',
           // loadChildren: () => import('../speaker-list/speaker-list.module').then(m => m.SpeakerListModule)
          },
          {
            path: 'session/:sessionId',
           // loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          },
          {
            path: 'speaker-details/:speakerId',
           // loadChildren: () => import('../speaker-detail/speaker-detail.module').then(m => m.SpeakerDetailModule)
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../../about/about.module').then(m => m.AboutModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/admin/accounts',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

