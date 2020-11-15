import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
    private route: ActivatedRoute,
    private router: Router,
    public inAppBrowser: InAppBrowser,
    private petService: PetService,
    public alertCtrl: AlertController,
    private alertService: AlertService,
    private accountService: AccountService
  ) {}

  ionViewWillEnter() {
    this.accountId = this.accountService.accountValue.id;
    this.petId = this.route.snapshot.paramMap.get("petId");
    this.petService.getById(this.petId).forEach((Element) => {
      this.petName = Element.petName;
      this.breed = Element.breed;
      this.species = Element.species;
    });
  }

  openExternalUrl(url: string) {
    this.inAppBrowser.create(url, "_blank");
  }
  async editPetName() {
    const alert = await this.alertCtrl.create({
      header: "Change Pet Name",
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: async (data: any) => {
            await this.updatePet(data);
            await this.createTempObject(data);
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

  private async updatePet(contextParamValue) {
    this.petService
      .update(this.petId, contextParamValue)
      .pipe(first())
      .subscribe({
        next: async () => {
          this.ionViewWillEnter();
        },
        error: (error) => {},
      });
  }
  //used to search the accounts pet array...
  private searchArray(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i]._id == nameKey) {
        return i;
      }
    }
  }

  private async updateAccount(newModifiedObject) {
    (await this.accountService.update(this.accountId, newModifiedObject))
      .pipe(first())
      .subscribe({
        next: async () => {
          await this.alertService.presentLoading("Saving Pet...", 500);
          this.alertService.createToastAlert(
            "Update to Pet successful",
            "success",
            5000
          );
        },
        error: async (error) => {
          await this.alertService.createToastAlert(
            "Update to pet Failed...",
            "warning",
            5000
          );
        },
      });
  }

  private async createTempObject(newParamValue) {
    let NewAccount: any;
    (await this.accountService.getById(this.accountId)).forEach(
      async (Element) => {
        NewAccount = Element;
        const petsArray = Element.pets;
        const petToUpdateIndex = this.searchArray(this.petId, petsArray);
        NewAccount.pets[petToUpdateIndex].petName = await newParamValue.petName;
        await this.updateAccount(NewAccount);
      }
    );
  }
}
