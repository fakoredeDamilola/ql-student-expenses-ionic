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
            await this.createTempObject(data);
            await this.updatePetMasterList(data);
            await this.petName;
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
          await this.alertService.presentLoading("Saving Pet...", 500);
          this.alertService.createToastAlert(
            "Update to Pet To Master List successful",
            "success",
            5000
          );
          await this.ionViewWillEnter();
        },
        error: async (error) => {
          await this.alertService.createToastAlert(
            "Update to pet Master List Failed...",
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

  private async updateAccountPet(newModifiedObject) {
    (await this.accountService.update(this.accountId, newModifiedObject))
      .pipe(first())
      .subscribe({
        next: async () => {
          await this.alertService.presentLoading("Saving Pet...", 500);
          this.alertService.createToastAlert(
            "Update to Pet To Account successful",
            "success",
            5000
          );
          await this.ionViewWillEnter();
        },
        error: async (error) => {
          await this.alertService.createToastAlert(
            "Update to pet To Account Failed...",
            "warning",
            5000
          );
        },
      });
  }

  private async createTempObject(newParamValue) {
    let accountToModify = this.accountService.accountValue;
    let petsArray = accountToModify.pets;
    const petToUpdateIndex = this.searchArray(this.petId, petsArray);
    accountToModify.pets[
      petToUpdateIndex
    ].petName = await newParamValue.petName;
    await this.updateAccountPet(accountToModify);
  }
}
