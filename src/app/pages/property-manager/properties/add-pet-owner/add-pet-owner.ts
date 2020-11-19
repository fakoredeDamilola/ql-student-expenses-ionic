import { Component, HostListener } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";


import { UserOptions } from "@app/interfaces/user-options";
import { AccountService, AlertService, PropertyService } from "@app/_services";
import { Route } from '@angular/compiler/src/core';
import { first } from 'rxjs/operators';
import { UserData } from '@app/providers/user-data';

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
    acceptTerms: false,
    propertyId:"",
    propertyManagerId:"",
    password:"",
    confirmPassword:""
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
    public accountService: AccountService,
    private userData: UserData
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
    // creating variables for default account
    form.value.propertyManagerId = this.accountId;
    form.value.propertyId = this.propertyId;
    form.value.password = "PetCheck123";
    form.value.confirmPassword = "PetCheck123"

    if(!form.value.title){
      form.value.title = "N/A"
    }

    //console.log("the form for add pet owner...", form.value)
    this.loading = true;
    (await this.accountService.register(form.value)).pipe(first()).subscribe({
      next: async () => {
        //TODO Replace with toast alert
        await this.alertService.createToastAlert(
          "Invite Email Sent Successfully",
          "success",
          5000
        );
        await this.userData.signup(this.signup.email);
      },
      error: async (error) => {
        await this.alertService.createToastAlert(
          "Invite Email Sent Failed!",
          "danger",
          5000
        );
        this.loading = false;
      },
    });
  }


}
