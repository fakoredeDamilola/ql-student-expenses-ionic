﻿import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

import { AccountService, AlertService } from "@app/_services";
import { ToastController } from "@ionic/angular";

enum EmailStatus {
  Verifying,
  Failed,
}

@Component({ templateUrl: "verify-email.component.html" })
export class VerifyEmailComponent implements OnInit {
  EmailStatus = EmailStatus;
  emailStatus = EmailStatus.Verifying;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private toastCtrl: ToastController,
    private toastAlert:AlertService
  ) //private alertService: AlertService
  {}

  ngOnInit() {
    const token = this.route.snapshot.queryParams["token"];
    // remove token from url to prevent http referer leakage
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });
    this.accountService
      .verifyEmail(token)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl("/login");
          //this.alertEmailVerefied();
          this.toastAlert.createToastAlert("Email Verefied Successfully, You May Now Log In To Pet Check");
        },
        error: () => {
          this.emailStatus = EmailStatus.Failed;
        },
      });
  }

  // TODO want to move this to alert service....
  async alertEmailVerefied() {
    const toast = await this.toastCtrl.create({
      message: "Email Verefied Successfully, You May Now Log In To Pet Check",
      position: "bottom",
      buttons: [
        {
          role: "cancel",
          text: "Ok",
        },
      ],
    });
    await toast.present();
    toast.onDidDismiss();
  }
}
