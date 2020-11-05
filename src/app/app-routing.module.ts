import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyEmailComponent } from '@app/pages/my-account/verify-email/verify-email.component';
import { CheckTutorial } from '@app/providers/check-tutorial.service';
import { AuthGuard } from '@app/_helpers';
import { Role } from '@app/_models';

const routes: Routes = [
  { path: '', redirectTo: '/tutorial', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('@app/pages/home/home.module').then(x => x.HomePageModule)},
  { path: 'admin', loadChildren: () => import('@app/pages/admin/admin.module').then(m => m.AdminModule),canActivate: [AuthGuard],data: { roles: [Role.Admin] } },
  { path: 'account/profile', loadChildren: () => import('@app/pages/my-account/profile/profile.module').then(m => m.ProfileModule),canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('@app/pages/my-account/login/login.module').then(m => m.LoginModule)},
  { path: 'signup', loadChildren: () => import('@app/pages/my-account/signup/signup.module').then(m => m.SignUpModule)},
  { path: 'account/verify-email', component: VerifyEmailComponent },
  { path: 'support', loadChildren: () => import('@app/pages/my-account/support/support.module').then(m => m.SupportModule)},
  { path: 'tutorial', loadChildren: () => import('@app/pages/tutorial/tutorial.module').then(m => m.TutorialModule),canLoad: [CheckTutorial]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
