import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";

import { UserData } from "@app/providers/user-data";

import { UserOptions } from "@app/interfaces/user-options";
import { AccountService, AlertService } from "@app/_services";
import { first } from "rxjs/operators";


@Component({
  selector: "page-login",
  templateUrl: "login.html",
  styleUrls: ["./login.scss"],
})
export class LoginPage {
  loading = false;
  submitted = false;
  login: UserOptions = { email: "", password: "" };
  constructor(
    public userData: UserData,
    public router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  async onSignup() {
    await this.router.navigateByUrl("/signup");
  }

  async onForgotPassword() {
    await this.router.navigateByUrl("/forgot-password");
  }

  async onLogin() {
    await this.alertService.presentLoading("Logging In...", 1500);
    this.submitted = true;

    this.loading = true;
    this.accountService
      .login(this.login.email, this.login.password)
      .pipe(first())
      .subscribe({
        next: async () => {
          // get return url from query parameters or default to home page
          await this.userData.login(this.login.email);
          // redirect to home page when you login
          await this.router.navigateByUrl("/home");
          await this.alertService.createToastAlert(
            "Log In Sucessful",
            "success",
            2000
          );
          this.loading = false;
        },
        error: async (error) => {
          await this.alertService.createToastAlert(
            "Log In Failed, Please Check That Your Email & Password Is Correct.",
            "danger",
            3000
          );
          this.loading = false;
          return;
        },
      });
  }
}
