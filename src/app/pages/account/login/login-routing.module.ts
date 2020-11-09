import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordModule } from '../forgot-password/forgot-password.module';

import { LoginPage } from './login';

const routes: Routes = [
  {
    path: '',
    component: LoginPage},

      { path: 'forgot-password', component: ForgotPasswordModule }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPageRoutingModule { }
