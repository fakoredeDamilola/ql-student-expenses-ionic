import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService } from "@app/_services";
import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";
import { Pet, Property } from '@app/_models';

@Component({
  selector: "page-account-details",
  templateUrl: "account-details.html",
  styleUrls: ["./account-details.scss"],
})
export class AccountDetailsPage {
  accountId: any;
  account = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    updated: "",
    isVerified: true,
    created: "",
    title: ""
  };

  petOwnerProperty:Property = {
    id:"",
    houseUnitNumber:"",
    street:"",
    city:"",
    state:"",
    zip:"",
    propertyManagerId:""
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

  constructor(
    public route: ActivatedRoute,
    public inAppBrowser: InAppBrowser,
    public accountService: AccountService,
    public alertCtrl: AlertController,
    public alertService: AlertService
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
  }
  async ionViewWillEnter() {
    (await this.loading).present();
    this.accountId = this.route.snapshot.paramMap.get("accountId");
    // get id out of url
    /*window.history.replaceState(
      {},
      document.title,
      "/" + "property-manager/pet-owners/pet-owner-details"
    );*/
    (await this.accountService.getById(this.accountId))
      .forEach(async (Element) => {
        console.log(Element);
        if(Element.petOwnerProperty){
        this.hasProperty = true;
        this.petOwnerProperty = Element.petOwnerProperty;
        }
        if(Element.petOwnerPets.length>0){
          this.hasPets = true;
          this.petOwnerPets = Element.petOwnerPets
        }
        if(Element.propertyManagerProperties.length>0){
          this.hasProperties = true;
          this.propertyManagerPropertiesCount = Element.propertyManagerProperties.length;
          this.propertyManagerPetOwnersCount = Element.propertyManagerPetOwnersCount;
          this.propertyManagerPetsCount = Element.propertyManagerPetsCount;
        }
        this.account = Element;
      })
      .then(async () => {
        (await this.loading).dismiss();
      });
  }
}
