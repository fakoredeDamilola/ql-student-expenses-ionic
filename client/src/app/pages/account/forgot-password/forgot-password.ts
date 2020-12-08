import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserData } from "@app/providers/user-data";

import { UserOptions } from "@app/interfaces/student-options";
import { AccountService, AlertService } from "@app/_services";
import { finalize, first } from "rxjs/operators";

@Component({
  selector: "page-forgot-password",
  templateUrl: "forgot-password.html",
  styleUrls: ["./forgot-password.scss"],
})
export class ForgotPasswordPage {
  forgotPassword: UserOptions = {
    email: ""
  };
  submitted = false;
  loading = false;

  constructor(
    public router: Router,
    public userData: UserData,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  async onForgotPassword(form?: NgForm) {
    this.submitted = true;
    // stop here if form is invalid
    if (form.invalid) {
      return;
    }
    this.loading = true;
    (await this.accountService.forgotPassword(form.value.email))
      .pipe(first())
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () =>
          this.alertService.createToastAlert(
            "Please check your email for password reset instructions",
            "success",
            5000
          ),
        error: () =>
          this.alertService.createToastAlert(
            "Email Not Found...",
            "warning",
            5000
          ),
      });
  }
}
