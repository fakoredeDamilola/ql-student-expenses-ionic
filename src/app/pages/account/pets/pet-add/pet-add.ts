import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceData } from '@app/providers/conference-data';
import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AccountService } from '@app/_services';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PetOptions } from '@app/interfaces/pet-options';
import { Species } from '@app/_models';

@Component({
  selector: 'page-pet-add',
  templateUrl: 'pet-add.html',
  styleUrls: ['./pet-add.scss'],
})
export class PetAddPage {
  account = this.accountService.accountValue;
  submitted: boolean = false;
  loading: boolean;
  toastAlert: any;
  userData: any;
  router: any;

  addPet: PetOptions = {
    petName: "",
    species: "",
    breed: ""
  };

  constructor(
    private accountService:AccountService,
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
  ) {}

  ionViewWillEnter() {

  }








  async onAddPet(form?: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
      return;
    }
    this.loading = true;
    (await this.accountService.register(form.value)).pipe(first()).subscribe({
      next: async () => {
        //TODO Replace with toast alert
        await this.toastAlert.createToastAlert(
          "Registration successful, please check your email for verification instructions",
          "success",
          5000
        );
        //await this.userData.signup(this.signup.email);
        await this.router.navigateByUrl("/login");
      },
      error: async (error) => {
        await this.toastAlert.createToastAlert(
          "Registration Failed!",
          "danger",
          5000
        );
        this.loading = false;
      },
    });
  }
}
