import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { AccountsPage } from '../accounts/accounts';


const routes: Routes = [
  {
    path: '',
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
        path: 'properties',
        children: [
          {
            path: '',
           loadChildren: () => import('../properties/properties.module').then(m => m.PropertiesModule)
          },
         /* {
            path: 'property/:sessionId',
            loadChildren: () => import('../properties/properties.module').then(m => m.PropertiesModule)
          }*/
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

