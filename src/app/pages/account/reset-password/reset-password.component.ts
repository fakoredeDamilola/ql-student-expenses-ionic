﻿import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm} from "@angular/forms";
import { first } from "rxjs/operators";

import { AccountService, AlertService } from "@app/_services";
import { UserOptions } from "@app/interfaces/user-options";

enum TokenStatus {
  Validating,
  Valid,
  Invalid,
}

@Component({ templateUrl: "reset-password.component.html" })
export class ResetPasswordComponent implements OnInit {
  resetPassword: UserOptions = { password: "" };
  TokenStatus = TokenStatus;
  tokenStatus = TokenStatus.Validating;
  token = null;
  loading = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  async ngOnInit() {

    await console.log(" I DID GET HERE!!!!!")
    const token = await this.route.snapshot.queryParams["token"];

    // remove token from url to prevent http referer leakage
    await this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    (await this.accountService.validateResetToken(token))
      .pipe(first())
      .subscribe({
        next: async () => {
          this.token = await token;
          this.tokenStatus = TokenStatus.Valid;
        },
        error: () => {
          this.tokenStatus = TokenStatus.Invalid;
        },
      });
  }

  async onSubmit(form: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
      return;
    }

    this.loading = true;
    (
      await this.accountService.resetPassword(
        this.token,
        form.value.password,
        form.value.password
      )
    )
      .pipe(first())
      .subscribe({
        next: async () => {
          await this.alertService.createToastAlert(
            "Password reset successful, you can now login",
            "success",
            3000
          );
          await this.router.navigateByUrl("/login");
        },
        error: async (error) => {
          await this.alertService.createToastAlert(error, "warning", 5000);
          this.loading = false;
        },
      });
  }
}
