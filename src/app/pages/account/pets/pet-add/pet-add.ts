import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ConferenceData } from "@app/providers/conference-data";
import { ActionSheetController } from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService, PetService } from "@app/_services";
import { NgForm } from "@angular/forms";
import { first } from "rxjs/operators";
import { PetOptions } from "@app/interfaces/pet-options";
//import { Species } from "@app/_models";

@Component({
  selector: "page-pet-add",
  templateUrl: "pet-add.html",
  styleUrls: ["./pet-add.scss"],
})
export class PetAddPage {
  account = this.accountService.accountValue;
  submitted: boolean = false;
  loading: boolean;
  userData: any;

  addPet: PetOptions = {
    petImage: "",
    petName: "",
    species: "",
    breed: "",
  };

  constructor(
    private accountService: AccountService,
    private petService: PetService,
    private router: Router,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public alertService: AlertService
  ) {}

  async ionViewWillEnter() {}

  async onAddPet(form?: NgForm) {
    this.submitted = true;
    this.alertService.presentLoading("Saving Pet...", 1200);
    // stop here if form is invalid
    if (form.invalid) {
      this.alertService.createToastAlert(
        "Add To Pets failed, fields are invalid.....!",
        "danger",
        8000
      );
      return;
    }

    form.value.petOwnerId = this.account.id;
    form.value.propertyId = this.account.propertyId;
    form.value.propertyManagerId = this.account.propertyManagerId;

    this.loading = true;
    this.petService
      .create(form.value)
      .pipe(first())
      .subscribe({
        next: async () => {
          //TODO Replace with toast alert
          this.alertService.createToastAlert(
            "Added Pet To Account Successfully!",
            "success",
            5000
          );
          //await this.userData.signup(this.signup.email);
          this.router.navigateByUrl("/account/pets");
        },
        error: async (error) => {
          this.alertService.createToastAlert(
            "Add to pets failed.....!",
            "danger",
            5000
          );
          this.loading = false;
        },
      });
  }
}
