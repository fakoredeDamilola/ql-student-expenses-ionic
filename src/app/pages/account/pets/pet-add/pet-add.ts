import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConferenceData } from "@app/providers/conference-data";
import { ActionSheetController } from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService, PetService } from "@app/_services";
import { NgForm } from "@angular/forms";
import { first } from "rxjs/operators";
import { PetOptions } from "@app/interfaces/pet-options";
import {Location} from '@angular/common';
//import { Species } from "@app/_models";

@Component({
  selector: "page-pet-add",
  templateUrl: "pet-add.html",
  styleUrls: ["./pet-add.scss"],
})
export class PetAddPage {
  account = this.accountService.accountValue
  submitted: boolean = false;
  userData: any;
  addPet: PetOptions = {
    petImage: "",
    petName: "",
    species: "",
    breed: "",
  };
  loading: Promise<HTMLIonLoadingElement>;
  savingPet: Promise<HTMLIonLoadingElement>;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private petService: PetService,
    private router: Router,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public alertService: AlertService,
    private _location: Location
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
    this.savingPet = this.alertService.presentLoading("Saving Pet...");
  }

  async ionViewWillEnter() {
    (await (this.loading)).present();
  }

  async ionViewDidEnter(){
    (await (this.loading)).dismiss();
  }

  async onAddPet(form?: NgForm) {
    (await (this.savingPet)).present();
    this.submitted = true;
    // stop here if form is invalid
    if (form.invalid) {
      this.alertService.createToastAlert(
        "Add To Pets failed, fields are invalid.....!",
        "danger",
        8000
      );
      (await (this.savingPet)).dismiss();
      return;
    }
    form.value.petOwnerId = this.account.id;
    const accountId = this.route.snapshot.paramMap.get("accountId")
    console.log("this accountId", accountId)
    if(accountId!=null){
      form.value.petOwnerId = accountId;
    }
    //form.value.propertyId = this.account.propertyId;
    //form.value.propertyManagerId = this.account.propertyManagerId;

    this.petService
      .create(form.value)
      .pipe(first())
      .subscribe({
        next: async () => {
          (await (this.savingPet)).dismiss();
          //TODO Replace with toast alert
          this.alertService.createToastAlert(
            "Added Pet To Account Successfully!",
            "success",
            5000
          );
          //await this.userData.signup(this.signup.email);
          this._location.back();
        },
        error: async (error) => {
          (await (this.savingPet)).dismiss();
          this.alertService.createToastAlert(
            "Add to pets failed.....!",
            "danger",
            5000
          );
        },
      });
  }
}
