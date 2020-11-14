import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConferenceData } from "@app/providers/conference-data";
import { ActionSheetController } from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService } from "@app/_services";
import { NgForm } from "@angular/forms";
import { first } from "rxjs/operators";
import { PetOptions } from "@app/interfaces/pet-options";
import { Species } from "@app/_models";

@Component({
  selector: "page-pet-add",
  templateUrl: "pet-add.html",
  styleUrls: ["./pet-add.scss"],
})
export class PetAddPage {
  account = this.accountService.accountValue;
  submitted: boolean = false;
  loading: boolean;
  userData: any;

  addPet: PetOptions = {
    petImage:"",
    petName: "",
    species: "",
    breed: "",
  };

  constructor(
    private accountService: AccountService,
    private dataProvider: ConferenceData,
    private router: Router,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public toastAlert: AlertService
  ) {}

  ionViewWillEnter() {}

  async onAddPet(form?: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
      return;
    }

    form.value.petOwnerId = this.account.id;

    this.loading = true;
    (await this.accountService.pushPetToAccount(this.account.id, form.value))
      .pipe(first())
      .subscribe({
        next: async () => {
          //TODO Replace with toast alert
          this.toastAlert.createToastAlert(
            "Added Pet To Account Successfully!",
            "success",
            5000
          );
          //await this.userData.signup(this.signup.email);
          await this.router.navigateByUrl("/account/pets");
        },
        error: async (error) => {
          await this.toastAlert.createToastAlert(
            "Add to pets failed.....!",
            "danger",
            5000
          );
          this.loading = false;
        },
      });
  }
}
