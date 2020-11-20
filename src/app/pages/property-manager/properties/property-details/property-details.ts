import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService, PropertyService } from "@app/_services";
import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";
import { Account } from "@app/_models/account";

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
  city: string;
  state: string;
  zip: string;
  petCount: number;
  petOwner: any;
  petOwnerCount: number;
  // key value for the edit input
  key: any;
  value: any;
  saving: boolean = true;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public inAppBrowser: InAppBrowser,
    public propertyService: PropertyService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    public accountService: AccountService
  ) {}

  async ionViewWillEnter() {
    this.accountId = this.accountService.accountValue.id;
    this.propertyId = this.route.snapshot.paramMap.get("propertyId");
    // get id out of url
    window.history.replaceState(
      {},
      document.title,
      "/" + "property-manager/properties/property-details"
    );
    await (await this.propertyService
      .getById(this.propertyId))
      .forEach(async (Element) => {
        //console.log(Element,"here")
        this.propertyName = Element.propertyName;
        this.houseUnitNumber = Element.houseUnitNumber;
        this.street = Element.street;
        this.city = Element.city;
        this.state = Element.state;
        this.zip = Element.zip;
        this.petCount = Element.propertyPetsCount;
        this.petOwner = Element.propertyPetOwner;
        this.petOwnerCount = Element.propertyPetOwnerCount;
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
              this.key = key;
              this.value = data[key];
            });
            this.alertService.presentLoading("Saving Property...", 1200);
            //this.createTempObject();
            this.updatePropertyMasterList(data);
          },
        },
      ],
      inputs: [
        {
          type: "text",
          name: "propertyName",
          value: this.propertyName,
          placeholder: "Property Name (optional)",
        },
      ],
    });
    alert.present();
  }

  private async updatePropertyMasterList(contextParamValue) {
    //console.log(contextParamValue,"what is this??");
    (await this.propertyService
      .update(this.propertyId, contextParamValue))
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
}
