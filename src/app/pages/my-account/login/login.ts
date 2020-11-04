import { Component } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { UserData } from "../../../providers/user-data";

import { UserOptions } from "../../../interfaces/user-options";
import { AccountService, AlertService } from "@app/_services";
import { first } from "rxjs/operators";

@Component({
  selector: "page-login",
  templateUrl: "login.html",
  styleUrls: ["./login.scss"],
})
export class LoginPage {
  form: FormGroup;
  loading = false;
  submitted = false;

  login: UserOptions = { email: "", password: "" };

  constructor(
    private formBuilder: FormBuilder,
    public userData: UserData,
    public router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private alertService:AlertService
  ) {}

  async ngOnInit() {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  async onSignup() {
    await this.router.navigateByUrl("/signup");
  }

  async onLogin(form: NgForm) {
    await this.alertService.presentLoading("Logging In...",1000);
    this.submitted = true;

    if (form.valid) {
      this.loading = true;
      this.accountService
        .login(this.login.email, this.login.password)
        .pipe(first())
        .subscribe({
          next:async () => {
            // get return url from query parameters or default to home page
            await this.userData.login(this.login.email);
            // redirect to home page when you login
            await this.router.navigateByUrl("/home");
            await this.alertService.createToastAlert("Log In Sucessful","success",2000);
          },
          error:async (error) => {
            await this.alertService.createToastAlert("Log In Failed, Please Check That Your Email & Password Is Correct.","danger",3000);
            this.loading = false;
            return;
          },
        });
    }
  }
}
