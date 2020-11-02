import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '@app/providers/user-data';

import { UserOptions } from '@app/interfaces/user-options';
import { AccountService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { title:'',firstName:'',lastName:'',email: '', password: '',confirmPassword:'', acceptTerms: false };
  submitted = false;
  loading = false;

  constructor(
    public router: Router,
    public userData: UserData,
    private accountService: AccountService,
  ) {}


  onSignup(form: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
        return;
    }

    this.loading = true;
    console.log(form.value)
    console.log(this.signup);
    this.accountService.register(form.value)
        .pipe(first())
        .subscribe({
            next: () => {
              //TODO Replace with toast alert
                //this.alertService.success('Registration successful, please check your email for verification instructions', { keepAfterRouteChange: true });
                this.userData.signup(this.signup.email);
                this.router.navigateByUrl('/login');
            },
            error: error => {
                //TODO this.alertService.error(error);
                this.loading = false;
            }
        });
  }
}
