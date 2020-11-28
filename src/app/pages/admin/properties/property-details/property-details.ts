import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService, PropertyService } from "@app/_services";
import { AlertController, LoadingController } from "@ionic/angular";
import { first } from "rxjs/operators";
import {Location} from '@angular/common';
import { Pet } from '@app/_models';

@Component({
  selector: "page-property-details",
  templateUrl: "property-details.html",
  styleUrls: ["./property-details.scss"],
})
export class PropertyDetailsPage {
  accountId: string;
  propertyId: string;
  property = { houseUnitNumber:'', street:'',  city:'', state:'', zip:'' };
  petOwner ={title:'', firstName:'', lastName:'', isVerified:true, email:''};
  propertyManager ={title:'', firstName:'', lastName:'', isVerified:true, email:''};
  propertyPets:[Pet];
  // key value for the edit input
  key: any;
  value: any;
  saving: boolean = true;
  loading: any;
  savingProperty: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;
  deleting: Promise<HTMLIonLoadingElement>;
  propertyName: string;
  propertyPetsCount: number;
  propertyPetOwnerCount: number;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public inAppBrowser: InAppBrowser,
    public propertyService: PropertyService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    public accountService: AccountService,
    private _location: Location
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
    this.deleting = this.alertService.presentLoading("Deleting Account...");
    this.savingProperty = this.alertService.presentLoading("Saving Property...")
  }

  async ionViewWillEnter() {
    (await this.loading).present();
    this.accountId = this.accountService.accountValue.id;
    this.propertyId = this.route.snapshot.paramMap.get("propertyId");
    // get id out of url
    if(this.accountService.accountValue.role!='Admin'){
      window.history.replaceState(
        {},
        document.title,
        "/" + "property-manager/properties/property-details"
      );
    }

    (await this.propertyService
      .getById(this.propertyId))
      .forEach(async (Element) => {
        //console.log(Element,"here")
        this.property=Element;
        this.petOwner = Element.propertyPetOwner;
        this.propertyName = Element.propertyName;
        this.propertyPets = Element.propertyPets;
        this.propertyPetOwnerCount = Element.propertyPetOwnerCount;
        this.propertyManager = Element.propertyManager;
        this.propertyPetsCount = Element.propertyPets.length;
        console.log(Element)
      })
      .then(async () => {
        (await this.loading).dismiss();
      });
  }


  openExternalUrl(url: string) {
    this.inAppBrowser.create(url, "_blank");
  }

  async editPropertyAttribute(contextParameter:string) {
    // switch case so this is dynamic, pretty cool
    let popUpText:string;
    let currentValue:string;
    switch (contextParameter) {
      case "propertyName": {
        popUpText = "Name (Optional)";
        currentValue = this.propertyName;
        break;
      }
      case "houseUnitNumber": {
        popUpText = "House / Unit #";
        currentValue = this.property.houseUnitNumber;
        break;
      }
      case "street": {
        popUpText = "Street";
        currentValue = this.property.street;
        break;
      }
      case "city": {
        popUpText = "City";
        currentValue = this.property.city;
        break;
      }
      case "state": {
        popUpText = "State";
        currentValue = this.property.state;
        break;
      }
      case "zip": {
        popUpText = "Zip Code";
        currentValue = this.property.zip;
        break;
      }
    }
    // then that value from the switch being fed here
    const alert = await this.alertCtrl.create({
      header: `Change Property ${popUpText}?`,
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: async (data: any) => {
            ( await (this.savingProperty)).present();
            this.updatePropertyMasterList(data, popUpText);
          },
        },
      ],
      inputs: [
        {
          type: "text",
          value: `${currentValue}`,
          name: `${contextParameter}`,
          placeholder: `Property ${popUpText}`,
        },
      ],
    });
    alert.present();
  }

  private async updatePropertyMasterList(contextParamValue, popUpText) {
    //console.log(contextParamValue,"what is this??");
    (await this.propertyService
      .update(this.propertyId, contextParamValue))
      .pipe(first())
      .subscribe({
        next: async () => {
          ( await (this.savingProperty)).dismiss();
          this.alertService.createToastAlert(
            `Update To Property ${popUpText} Successful`,
            "success",
            8000
          );
          this.saving = false;
          this.ionViewWillEnter();
        },
        error: async (error) => {
          ( await (this.savingProperty)).dismiss();
          this.alertService.createToastAlert(
            `Update to Property ${popUpText} Failed...`,
            "warning",
            8000
          );
        },
      });
  }


  async deleteAreYouSure(){
    const alert = await this.alertCtrl.create({
      header: "Admin Delete Property",
      message: "Are You Sure you want to DELETE this property??  This Action can not be reversed.",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
          },
        },
        {
          text: "DELETE",
          handler: async () => {
            await this.deleteProperty();
          },
        },
      ],
    });
    // now present the alert on top of all other content
    await alert.present();
  }


  async deleteProperty() {
    (await this.deleting).present();
    this.propertyService
      .delete(this.propertyId)
      .pipe(first())
      .subscribe({
        next: async () => {
          //TODO Replace with toast alert
          (await this.deleting).dismiss();
          this.alertService.createToastAlert(
            "Property Deleted Successfully!",
            "success",
            8000
          );
          this._location.back();
        },
        error: async (error) => {
          (await this.deleting).dismiss();
          this.alertService.createToastAlert(
            "Property Delete failed.....!",
            "danger",
            8000
          );
        },
      });
  }
}
