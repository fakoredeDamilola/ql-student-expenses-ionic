import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyEmailComponent } from './pages/my-account/verify-email/verify-email.component';
import { CheckTutorial } from './providers/check-tutorial.service';
import { AuthGuard } from '@app/_helpers';
import { Role } from '@app/_models';

const routes: Routes = [
  { path: '', redirectTo: '/tutorial', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(x => x.HomePageModule)},
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),canActivate: [AuthGuard],data: { roles: [Role.Admin] } },
  { path: 'account/profile', loadChildren: () => import('./pages/my-account/profile/profile.module').then(m => m.ProfileModule),canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/my-account/login/login.module').then(m => m.LoginModule)},
  { path: 'signup', loadChildren: () => import('./pages/my-account/signup/signup.module').then(m => m.SignUpModule)},
  { path: 'account/verify-email', component: VerifyEmailComponent },
  { path: 'support', loadChildren: () => import('./pages/my-account/support/support.module').then(m => m.SupportModule)},
  { path: 'tutorial', loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),canLoad: [CheckTutorial]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
