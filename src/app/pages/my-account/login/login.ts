import { Component } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { UserData } from "../../../providers/user-data";

import { UserOptions } from "../../../interfaces/user-options";
import { AccountService } from "@app/_services";
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
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSignup() {
    this.router.navigateByUrl("/signup");
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    if (form.valid) {
      this.loading = true;
      this.accountService
        .login(this.login.email, this.login.password)
        .pipe(first())
        .subscribe({
          next: () => {
            // get return url from query parameters or default to home page
            this.userData.login(this.login.email);
            // redirect to home page when you login
            this.router.navigateByUrl("/home");
          },
          error: (error) => {
            //this.alertService.error(error);
            this.loading = false;
            return;
          },
        });
    }
  }
}
