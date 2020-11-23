import { Component, HostListener } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { UserOptions } from "@app/interfaces/user-options";
import { AccountService, AlertService, PropertyService } from "@app/_services";
import { Route } from "@angular/compiler/src/core";
import { first } from "rxjs/operators";
import { UserData } from "@app/providers/user-data";
import {Location} from '@angular/common';

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
    propertyId: "",
    propertyManagerId: "",
    password: "",
    confirmPassword: "",
  };
  submitted = false;

  accountId: string;
  propertyId: any;
  // key value for the edit input
  key: any;
  value: any;
  saving: boolean = true;
  loading: Promise<HTMLIonLoadingElement>;
  addingPetOwner: Promise<HTMLIonLoadingElement>;
  propertyManagerId: string;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public alertService: AlertService,
    public accountService: AccountService,
    private userData: UserData,
    private propertyService: PropertyService,
    private _location: Location
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
    this.addingPetOwner = this.alertService.presentLoading(
      "Adding Pet Owner &#10003;"
    );
  }

  async ionViewWillEnter() {
    (await this.loading).present();

    this.propertyId = this.route.snapshot.paramMap.get("propertyId");

    // get id out of the url
    this.accountId = this.route.snapshot.paramMap.get("accountId");
    if(this.accountService.accountValue.role!='Admin'){
      this.accountId = this.accountService.accountValue.id; //<-- The Property Manager ID! also currently logged in persons ID
      window.history.replaceState(
        {},
        document.title,
        "/" + "property-manager/properties/property-details/pet-owner/add"
      );
    }

  }

  async ionViewDidEnter() {
    (await this.loading).dismiss();
  }

  async onAddPetOwner(form?: NgForm) {
    (await this.addingPetOwner).present();
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
      (await this.addingPetOwner).dismiss();
      return;
    }
    // creating variables for default account
    form.value.propertyManagerId = this.accountId;
    form.value.propertyId = this.propertyId;
    form.value.password = "PetCheck123";
    form.value.confirmPassword = "PetCheck123";

    // TODO add the newly created accounts ID to this propertys Owner ID

    if (!form.value.title) {
      form.value.title = "N/A";
    }

    //console.log("the form for add pet owner...", form.value)

    (await this.accountService.register(form.value)).pipe(first()).subscribe({
      next: async () => {
        //TODO Replace with toast alert
        await this.alertService.createToastAlert(
          "Invite Email Sent Successfully",
          "success",
          5000
        );
        await this.userData.signup(this.signup.email);
        (await this.addingPetOwner).dismiss();
        this._location.back();
      },
      error: async (error) => {
        await this.alertService.createToastAlert(
          "Invite Email Sent Failed!",
          "danger",
          5000
        );
        (await this.addingPetOwner).dismiss();
      },
    });
  }
}
