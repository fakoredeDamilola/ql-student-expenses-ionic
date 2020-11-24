import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService } from "@app/_services";
import { AlertController } from "@ionic/angular";
import { first, toArray } from "rxjs/operators";
import { Pet, Property } from '@app/_models';

@Component({
  selector: "page-pet-owner-details",
  templateUrl: "pet-owner-details.html",
  styleUrls: ["./pet-owner-details.scss"],
})
export class PetOwnerDetailsPage {
  petOwnerId: any;
  //
  firstName: string;
  lastName: string;
  email: string;
  created: any;

  options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

  // key value for the edit input
  key: any;
  value: any;
  saving: boolean = true;
  loading: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;
  pets: [Pet];
  petsLength: number;
  property={  city:'', street:'', state:'', zip:'' };
  propertyName: string;

  constructor(
    public route: ActivatedRoute,
    public inAppBrowser: InAppBrowser,
    public accountService: AccountService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    private router: Router
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
  }

  async ionViewWillEnter() {
    (await this.loading).present();
    this.petOwnerId = this.route.snapshot.paramMap.get("petOwnerId");
    // get id out of url
    if(this.accountService.accountValue.role!='Admin'){
      window.history.replaceState(
        {},
        document.title,
        "/" + "property-manager/pet-owners/pet-owner-details"
      );
    }

    (await this.accountService.getById(this.petOwnerId))
      .forEach(async (Element) => {
        this.firstName = Element.firstName;
        this.lastName = Element.lastName;
        this.email = Element.email;
        this.created = Element.created;
        this.pets = Element.petOwnerPets;
        this.petsLength = this.pets.length;
        this.propertyName = Element.petOwnerProperty.propertyName;
        this.property = Element.petOwnerProperty;
        console.log(Element);
      })
      .then(async () => {
        (await this.loading).dismiss();
      });
  }


}
