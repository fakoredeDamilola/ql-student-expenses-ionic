import { Component, SimpleChanges } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserData } from "@app/providers/user-data";

import { UserOptions } from "@app/interfaces/student-options";
import { AccountService, AlertService } from "@app/_services";
import { first } from "rxjs/operators";
import { Location } from "@angular/common";

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
    acceptTerms: true,
    role: "",
  };
  submitted = false;
  loading = false;
  allReportsManagers:any;

  loadListDone:boolean=false;

  constructor(
    public router: Router,
    public userData: UserData,
    private accountService: AccountService,
    private toastAlert: AlertService,
    private _location: Location
  ) {}

  ionViewWillEnter() {}

  async onSignup(form?: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
      return;
    }
    this.loading = true;
    //console.log(form.value, "The Form Value");
    form.value.password = "StudentExpenses123";
    if (form.value.title == "") {
      form.value.title = "N/A";
    }
    form.value.confirmPassword = form.value.password;
    form.value.acceptTerms = true;
    (await this.accountService.register(form.value)).pipe(first()).subscribe({
      next: async () => {
        await this.toastAlert.createToastAlert(
          "Email Sent for verification instructions",
          "success",
          5000
        );
        //await this.userData.signup(this.signup.email);
        this._location.back();
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

  // Loading the list of Reports Managers & Admins because they can also be reports Managers
  ngOnChanges(changes: SimpleChanges) {
    if(changes.data) {
      const data = changes.data;
      console.log(data,'the changes???')
    }
  }

  async loadReportsManagers(role){
    console.log("It changed",role);
  if(role=='Student'){
   (await this.accountService.getAllReportsManagers())
          .forEach(async (Element) => {
          this.allReportsManagers = Element;
          })
          .then(()=>{
            this.loadListDone=true;
          });
        }
  }
}
