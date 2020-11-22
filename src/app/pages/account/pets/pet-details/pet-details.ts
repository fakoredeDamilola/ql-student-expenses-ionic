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
  savingPet: Promise<HTMLIonLoadingElement>;
  loading: Promise<HTMLIonLoadingElement>;

  constructor(
    public route: ActivatedRoute,
    public inAppBrowser: InAppBrowser,
    public petService: PetService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    public accountService: AccountService
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
    this.savingPet = this.alertService.presentLoading("Saving Pet...");
  }

  async ionViewWillEnter() {
    (await this.loading).present();
    this.accountId = this.accountService.accountValue.id;
    this.petId = this.route.snapshot.paramMap.get("petId");

    // get id out of the url
    if(this.accountService.accountValue.role!='Admin'){
    window.history.replaceState(
      {},
      document.title,
      "/" + "account/pets/pet-details"
    );
  }

    this.petService
      .getById(this.petId)
      .forEach(async (Element) => {
        this.petName = Element.petName;
        this.breed = Element.breed;
        this.species = Element.species;
      })
      .then(async () => {
        (await this.loading).dismiss();
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
            (await this.savingPet).present();
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
          (await this.savingPet).dismiss();
          this.alertService.createToastAlert(
            "Update To Pet Successful!",
            "success",
            8000
          );
          this.ionViewWillEnter();
        },
        error: async (error) => {
          (await this.savingPet).dismiss();
          this.alertService.createToastAlert(
            "Update To Pet Failed...",
            "warning",
            8000
          );
        },
      });
  }
}
