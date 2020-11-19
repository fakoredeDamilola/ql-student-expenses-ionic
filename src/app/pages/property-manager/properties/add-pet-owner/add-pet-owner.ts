import { Component, HostListener } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";


import { UserOptions } from "@app/interfaces/user-options";
import { AccountService, AlertService, PropertyService } from "@app/_services";
import { Route } from '@angular/compiler/src/core';
import { first } from 'rxjs/operators';

@Component({
  selector: "page-add-pet-owner",
  templateUrl: "add-pet-owner.html",
  styleUrls: ["./add-pet-owner.scss"],
})
export class AddPetOwnerPage {
  signup: UserOptions = {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  submitted = false;
  loading = false;

  accountId: string;
  propertyId: any;
  // key value for the edit input
  key:any;
  value:any;
  saving:boolean=true;


  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public alertService: AlertService,
    public accountService: AccountService
  ) {}

  async ionViewWillEnter() {
    this.accountId = this.accountService.accountValue.id;//<-- The Property Manager ID! also currently logged in persons ID
    this.propertyId = this.route.snapshot.paramMap.get("propertyId");
  }

  async onAddPetOwner(form?: NgForm){
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
      return;
    }
    this.loading = true;
    (await this.accountService.register(form.value)).pipe(first()).subscribe({
      next: async () => {
        //TODO Replace with toast alert
        await this.alertService.createToastAlert(
          "Registration successful, please check your email for verification instructions",
          "success",
          5000
        );
        await this.userData.signup(this.signup.email);
        await this.router.navigateByUrl("/login");
      },
      error: async (error) => {
        await this.alertService.createToastAlert(
          "Registration Failed!",
          "danger",
          5000
        );
        this.loading = false;
      },
    });
  }


}
