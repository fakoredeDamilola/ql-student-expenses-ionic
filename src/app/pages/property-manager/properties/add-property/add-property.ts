import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ConferenceData } from "@app/providers/conference-data";
import { ActionSheetController, LoadingController } from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AccountService, AlertService, PropertyService } from "@app/_services";
import { NgForm } from "@angular/forms";
import { first } from "rxjs/operators";
import { PropertyOptions } from "@app/interfaces/property-options";

@Component({
  selector: "page-property-add",
  templateUrl: "add-property.html",
  styleUrls: ["./add-property.scss"],
})
export class AddPropertyPage {
  account = this.accountService.accountValue;
  submitted: boolean = false;
  loading: any;

  addProperty: PropertyOptions = {
    propertyName: "",
    houseUnitNumber: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    petCount: 0,
  };

  constructor(
    private accountService: AccountService,
    private propertyService: PropertyService,
    private router: Router,
    public actionSheetCtrl: ActionSheetController,
    public alertService: AlertService,
    private loadingController: LoadingController
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
  }

  async ionViewDidEnter(){
    ( await (this.loading)).dismiss();
  }

  async ionViewWillEnter() {
    ( await (this.loading)).present();
  }

  async onAddProperty(form?: NgForm) {
    ( await (this.loading)).present();
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
    form.value.propertyManagerId = this.account.id;

    (
      this.propertyService.create(
        form.value
      )
    )
      .pipe(first())
      .subscribe({
        next: async () => {
          //TODO Replace with toast alert
          ( await (this.loading)).dismiss();
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