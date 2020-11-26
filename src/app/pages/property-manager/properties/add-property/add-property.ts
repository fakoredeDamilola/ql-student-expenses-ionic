import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ActionSheetController, LoadingController } from "@ionic/angular";
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
  currentRoute: string = this.router.url;

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
    private route: ActivatedRoute
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
  }

  async ionViewDidEnter() {
    (await this.loading).dismiss();
  }

  async ionViewWillEnter() {
    (await this.loading).present();
  }

  async onAddProperty(form?: NgForm) {
    (await this.loading).present();
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

    if (this.accountService.accountValue.role == "Admin") {
      console.log(this.route.snapshot.paramMap.get("accountId"));
      form.value.propertyManagerId = this.route.snapshot.paramMap.get(
        "accountId"
      );

      if (this.route.snapshot.paramMap.get("accountId") == null) {
        form.value.propertyManagerId = this.account.id;
      }
    }

    this.propertyService
      .create(form.value)
      .pipe(first())
      .subscribe({
        next: async () => {
          //TODO Replace with toast alert
          (await this.loading).dismiss();
          this.alertService.createToastAlert(
            "Property Added Successfully!",
            "success",
            8000
          );
          //await this.userData.signup(this.signup.email);
          const backUrl = this.currentRoute.replace("/add", "");
          this.router.navigateByUrl(backUrl);
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
