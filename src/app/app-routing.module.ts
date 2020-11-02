import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';
import { AuthGuard } from './_helpers';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: () => import('././pages/home/home.module').then(x => x.HomePageModule)},
  { path: 'admin', loadChildren: () => import('./pages/admin/tabs-page-admin/tabs-page.module').then(m => m.AdminTabsModule),canActivate: [AuthGuard]},
  { path: 'account/profile', loadChildren: () => import('./pages/my-account/profile/profile.module').then(m => m.ProfileModule),canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/my-account/login/login.module').then(m => m.LoginModule)},
  { path: 'signup', loadChildren: () => import('./pages/my-account/signup/signup.module').then(m => m.SignUpModule)},
  { path: 'support', loadChildren: () => import('./pages/my-account/support/support.module').then(m => m.SupportModule)},
  { path: 'tutorial', loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),canLoad: [CheckTutorial]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
