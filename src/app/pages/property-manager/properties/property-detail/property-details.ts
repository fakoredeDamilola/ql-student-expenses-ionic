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
  // key value for the edit input
  key:any;
  value:any;
  saving:boolean=true;


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
          // this takes data and splits into key value
          Object.keys(data).forEach((key) => {
              this.key = key
              this.value=data[key];
          });
            this.alertService.presentLoading("Saving Property...", 1200);
            this.createTempObject();
            this.updatePropertyMasterList(data);
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
    alert.present();
  }

  private async updatePropertyMasterList(contextParamValue) {
    this.propertyService
      .update(this.propertyId, contextParamValue)
      .pipe(first())
      .subscribe({
        next: async () => {
          this.alertService.createToastAlert(
            "Update to Property To Master List successful",
            "success",
            8000
          );
            this.saving = false;
          this.ionViewWillEnter();
        },
        error: async (error) => {
            this.alertService.createToastAlert(
            "Update to Property Master List Failed...",
            "warning",
            8000
          );
        },
      });
  }
  //used to search the accounts pet array...
  private async searchArray(nameKey, myArray) {
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
          //await this.alertService.presentLoading("Saving Property...", 500);
          this.alertService.createToastAlert(
            "Update To Property On Account successful",
            "success",
            8000
          );
          this.ionViewWillEnter();
        },
        error: async (error) => {
             this.alertService.createToastAlert(
            "Update To Property On Account Failed...",
            "warning",
            8000
          );
        },
      });
  }
  // used to create a new object from current account object, and inserting the modified account object
  private async createTempObject() {
    let accountToModify = this.accountService.accountValue;
    const propertiesArray = accountToModify.properties;
    const propertyToUpdateIndex = await this.searchArray(this.propertyId, propertiesArray);
    accountToModify.properties[
      propertyToUpdateIndex
    ].propertyName = this.value;
    //console.log(accountToModify,"This should have the new value????")
    this.updateAccountProperty(accountToModify);
  }
}
