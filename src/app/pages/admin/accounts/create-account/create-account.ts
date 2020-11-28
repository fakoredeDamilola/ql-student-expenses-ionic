import { Component, HostListener } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserData } from "@app/providers/user-data";

import { UserOptions } from "@app/interfaces/user-options";
import { AccountService, AlertService } from "@app/_services";
import { first } from "rxjs/operators";

@Component({
  selector: "page-create-account",
  templateUrl: "create-account.html",
  styleUrls: ["./create-account.scss"],
})
export class CreateAccountPage {
  signup: UserOptions = {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: true
  };
  submitted = false;
  loading = false;

  constructor(
    public router: Router,
    public userData: UserData,
    private accountService: AccountService,
    private toastAlert: AlertService
  ) {}

  async onSignup(form?: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
      return;
    }
    this.loading = true;
    console.log(form.value,"The Form Value");
    form.value.password = "PetCheck123"
    if(form.value.title==""){
      form.value.title="N/A";
    }
    form.value.confirmPassword = await form.value.password;
    form.value.acceptTerms = true;
    (await this.accountService.register(form.value)).pipe(first()).subscribe({
      next: async () => {
        //TODO Replace with toast alert
        await this.toastAlert.createToastAlert(
          "Email Sent for verification instructions",
          "success",
          5000
        );
        await this.userData.signup(this.signup.email);
        await this.router.navigateByUrl("/login");
      },
      error: async (error) => {
        await this.toastAlert.createToastAlert(
          "Email Invite Failed Failed!",
          "danger",
          5000
        );
        this.loading = false;
      },
    });
  }
}