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
  submitted = false;
  login: UserOptions = { email: "", password: "" };
  loggingIn: Promise<HTMLIonLoadingElement>;
  loading: Promise<HTMLIonLoadingElement>;
  constructor(
    public userData: UserData,
    public router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.loggingIn = this.alertService.presentLoading("Logging In...");
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
  }

  async ionViewWillEnter() {
    (await this.loading).present();
  }

  async ionViewDidEnter() {
    (await this.loading).dismiss();
  }

  async onSignup() {
    await this.router.navigateByUrl("/signup");
  }

  async onForgotPassword() {
    await this.router.navigateByUrl("/forgot-password");
  }

  async onLogin() {
    (await this.loggingIn).present();
    this.submitted = true;
    (await this.accountService.login(this.login.email, this.login.password))
      .pipe(first())
      .subscribe({
        next: async () => {
          // get return url from query parameters or default to home page
          await this.userData.login(this.login.email);
          (await this.loggingIn).dismiss();
          // redirect to home page when you login
          this.router.navigateByUrl("/home");
          await this.alertService.createToastAlert(
            "Log In Sucessful",
            "success",
            2000
          );
        },
        error: async (error) => {
          (await this.loggingIn).dismiss();
          await this.alertService.createToastAlert(
            "Log In Failed, Please Check That Your Email & Password Is Correct.",
            "danger",
            3000
          );
          return;
        },
      });
  }
}
