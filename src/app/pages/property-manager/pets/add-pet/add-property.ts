import { Component } from "@angular/core";
import {  Router } from "@angular/router";
import { ConferenceData } from "@app/providers/conference-data";
import { ActionSheetController } from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService } from "@app/_services";
import { NgForm } from "@angular/forms";
import { first } from "rxjs/operators";
import { PropertyOptions } from '@app/interfaces/property-options';

@Component({
  selector: "page-property-add",
  templateUrl: "add-property.html",
  styleUrls: ["./add-property.scss"],
})
export class AddPropertyPage {
  account = this.accountService.accountValue;
  submitted: boolean = false;
  loading: boolean;

  addProperty: PropertyOptions = {
    propertyName: "",
    houseUnitNumber: "",
    street: "",
    city:"",
    state:"",
    zip:"",
    petCount:0
  };

  constructor(
    private accountService: AccountService,
    private router: Router,
    public actionSheetCtrl: ActionSheetController,
    public inAppBrowser: InAppBrowser,
    public alertService: AlertService
  ) {}

  ionViewWillEnter() {}

  async onAddProperty(form?: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
      this.alertService.createToastAlert(
        "Add to properties failed, fields are invalid.....!",
        "danger",
        8000
      );
      return;
    }
    this.alertService.presentLoading("Saving Property...", 1200);
    form.value.propertyManagerId = this.account.id;

    (await this.accountService.pushPropertyToAccount(this.account.id, form.value))
      .pipe(first())
      .subscribe({
        next: async () => {
          //TODO Replace with toast alert

          this.alertService.createToastAlert(
            "Property Added Successfully!",
            "success",
            8000
          );
          //await this.userData.signup(this.signup.email);
          this.router.navigateByUrl("/property-manager/properties");
        },
        error: async (error) => {
          this.alertService.createToastAlert(
            "Add to properties failed.....!",
            "danger",
            8000
          );
          this.loading = false;
        },
      });
  }
}
