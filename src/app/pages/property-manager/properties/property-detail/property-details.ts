import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService, PropertyService } from "@app/_services";
import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";

@Component({
  selector: "page-property-details",
  templateUrl: "property-details.html",
  styleUrls: ["./property-details.scss"],
})
export class PropertyDetailsPage {
  accountId: string;
  propertyId: any;
  propertyName: string;
  houseUnitNumber: string;
  street: string;
  city:string;
  state:string;
  zip:string;
  petCount:number;

  constructor(
    public route: ActivatedRoute,
    public inAppBrowser: InAppBrowser,
    public propertyService: PropertyService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    public accountService: AccountService
  ) {}

  async ionViewWillEnter() {
    this.accountId = this.accountService.accountValue.id;
    this.propertyId = this.route.snapshot.paramMap.get("propertyId");
    this.propertyService.getById(this.propertyId).forEach(async (Element) => {
      this.propertyName = Element.propertyName;
      this.houseUnitNumber = Element.houseUnitNumber;
      this.street = Element.street;
      this.city = Element.city;
      this.state = Element.state;
      this.zip = Element.zip;
      this.petCount = Element.petCount;
    });
  }

  openExternalUrl(url: string) {
    this.inAppBrowser.create(url, "_blank");
  }
  async editPropertyName() {
    let alert = await this.alertCtrl.create({
      header: "Change Property Name",
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: async (data: any) => {
            await this.createTempObject(data);
            await this.updatePropertyMasterList(data);
            this.propertyName;
          },
        },
      ],
      inputs: [
        {
          type: "text",
          name: "propertyName",
          value: this.propertyName,
          placeholder: "us",
        },
      ],
    });
    await alert.present();
  }

  private async updatePropertyMasterList(contextParamValue) {
    this.propertyService
      .update(this.propertyId, contextParamValue)
      .pipe(first())
      .subscribe({
        next: async () => {
          await this.alertService.presentLoading("Saving Pet...", 500);
          this.alertService.createToastAlert(
            "Update to Property To Master List successful",
            "success",
            5000
          );
          await this.ionViewWillEnter();
        },
        error: async (error) => {
          await this.alertService.createToastAlert(
            "Update to Property Master List Failed...",
            "warning",
            5000
          );
        },
      });
  }
  //used to search the accounts pet array...
  private searchArray(nameKey, myArray) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i]._id == nameKey) {
        return i;
      }
    }
  }

  private async updateAccountProperty(newModifiedObject) {
    (await this.accountService.update(this.accountId, newModifiedObject))
      .pipe(first())
      .subscribe({
        next: async () => {
          await this.alertService.presentLoading("Saving Property...", 500);
          this.alertService.createToastAlert(
            "Update To Property On Account successful",
            "success",
            5000
          );
          await this.ionViewWillEnter();
        },
        error: async (error) => {
          await this.alertService.createToastAlert(
            "Update To Property On Account Failed...",
            "warning",
            5000
          );
        },
      });
  }

  private async createTempObject(newParamValue) {
    let accountToModify = this.accountService.accountValue;
    let propertiesArray = accountToModify.properties;
    const petToUpdateIndex = this.searchArray(this.propertyId, propertiesArray);
    accountToModify.pets[
      petToUpdateIndex
    ].petName = await newParamValue.petName;
    await this.updateAccountProperty(accountToModify);
  }
}
