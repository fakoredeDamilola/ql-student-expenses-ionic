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
  accountID: string;
  data: boolean;
  loading: Promise<HTMLIonLoadingElement>;
  savingAccount: Promise<HTMLIonLoadingElement>;
  loggingOut: Promise<HTMLIonLoadingElement>;


  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    public accountService: AccountService,
    public alertService: AlertService,
    public loadingController: LoadingController
  ) {}

  async ionViewWillEnter() {
    this.data = false;
    this.loading = this.alertService.presentLoading("Student Expenses");
    (await this.loading)
      .present()
      .then(() => {
        this.accountID = this.accountService.accountValue.id;
        this.title = this.accountService.accountValue.title;
        this.firstName = this.accountService.accountValue.firstName;
        this.lastName = this.accountService.accountValue.lastName;
        this.email = this.accountService.accountValue.email;
        this.role = this.accountService.accountValue.role;
      })
      .finally(() => {
        setTimeout(async () => {
          this.data = true;
          (await this.loading).dismiss();
        }, 300);
      });
  }

  async ionViewDidlEnter() {}

  // TODO with images later
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
            this.savingAccount = this.alertService.presentLoading("Saving...");
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
    this.loggingOut = this.alertService.presentLoading("Logging Out..");
    (await this.loggingOut)
      .present()
      .then(async () => {
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

  private async updateAccountPassword(contextParamValue: string) {
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

  async deleteAccount() {
    this.alertService.createToastAlert(
      "Currently ONLY Admins Can Delete Accounts",
      "warning",
      8000
    );
  }
}
