import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPropertyManagerPage } from './tabs-page';
import { AccountsPage } from '../../admin/accounts/accounts';


const routes: Routes = [
  {
    path: 'property-manager',
    component: TabsPropertyManagerPage,
    children: [
      {
        path: 'properties',
        children: [
          {
            path: '',
            component: AccountsPage,
          },
         /* {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          }*/
        ]
      },
      {
        path: 'pet-owners',
        children: [

        ]
      },
      {
        path: 'pets',
        children: [

        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/schedule',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPagePropertyManagerRoutingModule { }

