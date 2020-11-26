import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService } from "@app/_services";
import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";
import { Account, Pet, Property } from "@app/_models";
import {Location} from '@angular/common';

@Component({
  selector: "page-pet-details",
  templateUrl: "pet-details.html",
  styleUrls: ["./pet-details.scss"],
})
export class PetDetailsPage {
  accountId: any;
  account = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    updated: "",
    isVerified: true,
    created: "",
    title: "",
  };

  petOwnerProperty = {
    id: "",
    houseUnitNumber: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    propertyManagerId: ""
  };

  options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  // key value for the edit input
  key: any;
  value: any;
  saving: boolean = true;
  loading: Promise<HTMLIonLoadingElement>;
  hasProperty: boolean = false;
  hasPets: boolean = false;
  petOwnerPets: [Pet];
  petOwnerPetsCount: number;
  hasProperties: boolean = false;
  // If they are a P.M
  propertyManagerProperties: [Property];
  propertyManagerPropertiesCount: number;
  propertyManagerPetOwnersCount: number;
  propertyManagerPetsCount: number;
  deleting: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;

  constructor(
    public route: ActivatedRoute,
    public inAppBrowser: InAppBrowser,
    public accountService: AccountService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    private router: Router,
    private _location: Location
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
    this.deleting = this.alertService.presentLoading("Deleting Account...");
  }
  async ionViewWillEnter() {
    (await this.loading).present();
    // The account your viewing....
    this.accountId = this.route.snapshot.paramMap.get("accountId");
    (await this.accountService.getById(this.accountId))
      .forEach(async (Element) => {
        console.log(Element);
        if (Element.petOwnerProperty) {
          this.hasProperty = true;
          this.petOwnerProperty = Element.petOwnerProperty;
        }
        if (Element.petOwnerPets.length > 0) {
          this.hasPets = true;
          this.petOwnerPets = Element.petOwnerPets;
        }
        if (Element.propertyManagerProperties.length > 0) {
          this.hasProperties = true;
          this.propertyManagerPropertiesCount =
            Element.propertyManagerProperties.length;
          this.propertyManagerPetOwnersCount =
            Element.propertyManagerPetOwnersCount;
          this.propertyManagerPetsCount = Element.propertyManagerPetsCount;
        }
        this.account = Element;
      })
      .then(async () => {
        (await this.loading).dismiss();
      });
  }

  async deleteAreYouSure(){
    const alert = await this.alertCtrl.create({
      header: "Admin Delete Account",
      message: "Are You Sure you want to DELETE this account??  This Action can not be reversed.",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
          },
        },
        {
          text: "DELETE",
          handler: async () => {
            await this.deleteAccount();
          },
        },
      ],
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  async deleteAccount() {
    (await this.deleting).present();
    this.accountService
      .delete(this.accountId)
      .pipe(first())
      .subscribe({
        next: async () => {
          //TODO Replace with toast alert
          (await this.deleting).dismiss();
          this.alertService.createToastAlert(
            "Account Deleted Successfully!",
            "success",
            8000
          );
          this._location.back();
        },
        error: async (error) => {
          (await this.deleting).dismiss();
          this.alertService.createToastAlert(
            "Account Delete failed.....!",
            "danger",
            8000
          );
        },
      });
  }
}
