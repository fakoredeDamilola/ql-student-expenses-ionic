import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService, AlertService } from "@app/_services";

import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";

import { UserData } from "@app/providers/user-data";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "page-account",
  templateUrl: "profile.html",
  styleUrls: ["./profile.scss"],
})
export class ProfilePage {
  // Get currently logged in accounts values
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
  accountID: any;
  loading: any;
  loggingOut: any;
  savingAccount: any;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    public accountService: AccountService,
    public alertService: AlertService,
    public loadingController: LoadingController
  ) {
    this.loggingOut = this.alertService.presentLoading(
      "Logging Out Pet Check &#10003;"
    );
    this.savingAccount = this.alertService.presentLoading("Saving...");
  }

  async ionViewWillEnter() {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
    (await this.loading).present();
    this.accountID = this.accountService.accountValue.id;
    this.title = this.accountService.accountValue.title;
    this.firstName = this.accountService.accountValue.firstName;
    this.lastName = this.accountService.accountValue.lastName;
    this.email = this.accountService.accountValue.email;
    this.role = this.accountService.accountValue.role;

    setTimeout(async () => {
      (await this.loading).dismiss();
    }, 300);
  }

  async ionViewDidlEnter() {}

  updatePicture() {
    console.log("Clicked to update picture");
  }

  async changeUsername() {}

  getUsername() {
    /* this.userData.getUsername().then((username) => {
      this.username = username;
    });*/
  }

  async changePassword() {
    const alert = await this.alertCtrl.create({
      header: "Change Password",
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: async (data: any) => {
            //console.log(data);
            (await this.savingAccount).present();
            await this.updateAccountPassword(data);
          },
        },
      ],
      inputs: [
        {
          type: "text",
          name: "password",
          placeholder: "password",
        },
      ],
    });
    await alert.present();
  }

  async logout() {
    (await this.loggingOut).present()
    .then(async ()=>{
      await this.userData.logout();
    })
    .finally(async () => {
      setTimeout(async () => {
        (await this.loggingOut).dismiss();
      }, 300);
    });
  }

  support() {
    this.router.navigateByUrl("/support");
  }

  private async updateAccountPassword(contextParamValue:string) {
    (await this.accountService.update(this.accountID, contextParamValue))
      .pipe(first())
      .subscribe({
        next: async () => {
          (await this.savingAccount).dismiss();
          this.alertService.createToastAlert(
            "Update to Password Successful",
            "success",
            8000
          );
          this.ionViewWillEnter();
        },
        error: async (error) => {
          (await this.savingAccount).dismiss();
          this.alertService.createToastAlert(
            "Update to Property Master List Failed...",
            "warning",
            8000
          );
        },
      });
  }
}
