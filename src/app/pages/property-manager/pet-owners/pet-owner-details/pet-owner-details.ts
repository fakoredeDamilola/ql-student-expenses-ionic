import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService, PropertyService } from "@app/_services";
import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";

@Component({
  selector: "page-pet-owner-details",
  templateUrl: "pet-owner-details.html",
  styleUrls: ["./pet-owner-details.scss"],
})
export class PetOwnerDetailsPage {
  petOwnerId: any;

  // key value for the edit input
  key:any;
  value:any;
  saving:boolean=true;


  constructor(
    public route: ActivatedRoute,
    public inAppBrowser: InAppBrowser,
    public accountService: AccountService,
    public alertCtrl: AlertController,
    public alertService: AlertService
  ) {}

  async ionViewWillEnter() {
    this.petOwnerId = this.route.snapshot.paramMap.get("petOwnerId");
    // get id out of url
    window.history.replaceState({}, document.title, "/" + "property-manager/pet-owners/pet-owner-details");
    (await this.accountService.getById(this.petOwnerId)).forEach(async (Element) => {
    console.log(await Element)
    });
  }



}
