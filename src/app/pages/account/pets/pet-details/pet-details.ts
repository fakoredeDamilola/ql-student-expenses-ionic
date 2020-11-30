import { Component , OnInit, ChangeDetectorRef  } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService, PetService } from "@app/_services";
import { AlertController, IonRouterOutlet, ModalController } from "@ionic/angular";
import { first } from "rxjs/operators";
import { Location } from '@angular/common';

import { ToastController } from '@ionic/angular';

import { WebView } from '@ionic-native/ionic-webview/ngx';



const STORAGE_KEY = 'my_images';
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
  rating: number;
  deleting: Promise<HTMLIonLoadingElement>;
  currentRoute: string = this.router.url;


  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public inAppBrowser: InAppBrowser,
    public petService: PetService,
    public alertCtrl: AlertController,
    public alertService: AlertService,
    public accountService: AccountService,
    public routerOutlet: IonRouterOutlet,
    public modalCtrl: ModalController,
    private _location: Location,
    private webview: WebView,
    private toastController: ToastController,

  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
    this.savingPet = this.alertService.presentLoading("Saving Pet...");
    this.deleting = this.alertService.presentLoading("Deleting Pet...");
  }



  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
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
        this.rating = Element.rating;
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


  async deleteAreYouSure(){
    const alert = await this.alertCtrl.create({
      header: "Delete Pet",
      message: "Are You Sure you want to DELETE this Pet??  This Action can not be reversed.",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
          },
        },
        {
          text: "DELETE",
          handler: async () => {
            await this.deletePet();
          },
        },
      ],
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  async deletePet() {
    (await this.deleting).present();
    this.petService
      .delete(this.petId)
      .pipe(first())
      .subscribe({
        next: async () => {
          //TODO Replace with toast alert
          (await this.deleting).dismiss();
          this.alertService.createToastAlert(
            "Pet Deleted Successfully!",
            "success",
            8000
          );
          this._location.back();
        },
        error: async (error) => {
          (await this.deleting).dismiss();
          this.alertService.createToastAlert(
            "Pet Delete failed.....!",
            "danger",
            8000
          );
        },
      });
  }





}


