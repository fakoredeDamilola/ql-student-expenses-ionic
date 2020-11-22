import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService, PropertyService } from "@app/_services";
import { AlertController, LoadingController } from "@ionic/angular";
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
  loading: any;
  savingProperty: Promise<HTMLIonLoadingElement>;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public inAppBrowser: InAppBrowser,
    public propertyService: PropertyService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    public accountService: AccountService,
    private loadingController: LoadingController
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
    this.savingProperty = this.alertService.presentLoading("Saving Property...")
  }

  async ionViewWillEnter() {
    (await this.loading).present();
    this.accountId = this.accountService.accountValue.id;
    this.propertyId = this.route.snapshot.paramMap.get("propertyId");
    // get id out of url
    window.history.replaceState(
      {},
      document.title,
      "/" + "property-manager/properties/property-details"
    );
    (await this.propertyService
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
      })
      .then(async () => {
        (await this.loading).dismiss();
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
            ( await (this.savingProperty)).present();
            // this takes data and splits into key value
            Object.keys(data).forEach((key) => {
              this.key = key;
              this.value = data[key];
            });
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
          ( await (this.savingProperty)).dismiss();
          this.alertService.createToastAlert(
            "Update To Property Successful",
            "success",
            8000
          );
          this.saving = false;
          this.ionViewWillEnter();
        },
        error: async (error) => {
          ( await (this.savingProperty)).dismiss();
          this.alertService.createToastAlert(
            "Update to Property Master List Failed...",
            "warning",
            8000
          );
        },
      });
  }
}
