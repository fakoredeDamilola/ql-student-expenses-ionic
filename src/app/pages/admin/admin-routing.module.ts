import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin';
import { AccountsPage } from './accounts/accounts';


const routes: Routes = [
  {
    path: '', component: Admin,
    children: [
      { path: 'accounts',
        children: [{path: '', component: AccountsPage },
         { path: 'account/:sessionId', loadChildren: () => import('./accounts/account-detail/account-detail.module').then(m => m.AccountDetailModule)}
        ]
      },
      { path: 'properties',
        children: [
          { path: '', loadChildren: () => import('./properties/properties.module').then(m => m.PropertiesModule)},
        ]
      },
      { path: 'pets',
        children: [
          { path: '', loadChildren: () => import('./pets/pets.module').then(m => m.PetsModule)},
         /* {
            path: 'property/:sessionId',
            loadChildren: () => import('../properties/properties.module').then(m => m.PropertiesModule)
          }*/
        ]
      },
      { path: '', redirectTo: '/app/admin/accounts', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

