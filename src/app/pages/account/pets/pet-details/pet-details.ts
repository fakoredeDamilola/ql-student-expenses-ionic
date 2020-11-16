import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService, PetService } from "@app/_services";
import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";

@Component({
  selector: "page-pet-details",
  templateUrl: "pet-details.html",
  styleUrls: ["./pet-details.scss"],
})
export class PetDetailsPage {
  accountId: any;
  petId: any;
  petName: any;
  species: any;
  breed: any;

  constructor(
    public route: ActivatedRoute,
    public inAppBrowser: InAppBrowser,
    public petService: PetService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    public accountService: AccountService
  ) {}

  async ionViewWillEnter() {
    this.accountId = this.accountService.accountValue.id;
    this.petId = this.route.snapshot.paramMap.get("petId");
    this.petService.getById(this.petId).forEach(async (Element) => {
      this.petName = Element.petName;
      this.breed = Element.breed;
      this.species = Element.species;
    });
  }

  openExternalUrl(url: string) {
    this.inAppBrowser.create(url, "_blank");
  }
  async editPetName() {
    let alert = await this.alertCtrl.create({
      header: "Change Pet Name",
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: async (data: any) => {
            this.alertService.presentLoading("Saving Pet...", 1000);
            this.createTempObject(data);
            this.updatePetMasterList(data);
          },
        },
      ],
      inputs: [
        {
          type: "text",
          name: "petName",
          value: this.petName,
          placeholder: "us",
        },
      ],
    });
    await alert.present();
  }

  private async updatePetMasterList(contextParamValue) {
    this.petService
      .update(this.petId, contextParamValue)
      .pipe(first())
      .subscribe({
        next: async () => {
          this.alertService.createToastAlert(
            "Update To Pet Master List Successful!",
            "success",
            8000
          );
        },
        error: async (error) => {
          this.alertService.createToastAlert(
            "Update To Pet Master List Failed...",
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

  private async updateAccountPet(newModifiedObject) {
    (await this.accountService.update(this.accountId, newModifiedObject))
      .pipe(first())
      .subscribe({
        next: async () => {
          this.alertService.createToastAlert(
            "Update To Pet On Account Successful",
            "success",
            8000
          );
          this.ionViewWillEnter();
        },
        error: async (error) => {
          this.alertService.createToastAlert(
            "Update To Pet On Account Failed...",
            "warning",
            8000
          );
        },
      });
  }

  private async createTempObject(newParamValue) {
    let accountToModify = this.accountService.accountValue;
    let petsArray = accountToModify.pets;
    const petToUpdateIndex = await this.searchArray(this.petId, petsArray);
    accountToModify.pets[
      petToUpdateIndex
    ].petName = await newParamValue.petName;
    await this.updateAccountPet(accountToModify);
  }
}
