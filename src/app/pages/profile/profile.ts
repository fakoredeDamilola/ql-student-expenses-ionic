import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService, AlertService } from "@app/_services";

import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";

import { UserData } from "@app/providers/user-data";

@Component({
  selector: "page-account",
  templateUrl: "profile.html",
  styleUrls: ["./profile.scss"],
})
export class ProfilePage {
  // Get currently logged in accounts values
  title:string;
  firstName:string;
  lastName:string;
  email:string;
  role:string;
  password:string;
  confirmPassword:string;
  accountID: any;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    public accountService: AccountService,
    public alertService: AlertService
  ) {}

  async ionViewDidEnter() {
    this.accountID = this.accountService.accountValue.id;
    this.title = this.accountService.accountValue.title;
    this.firstName = this.accountService.accountValue.firstName;
    this.lastName = this.accountService.accountValue.lastName;
    this.email = this.accountService.accountValue.email;
    this.role = this.accountService.accountValue.role;
  }

  updatePicture() {
    console.log("Clicked to update picture");
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: "Change Username",
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: (data: any) => {
            this.userData.setUsername(data.username);
            this.getUsername();
          },
        },
      ],
      inputs: [
        {
          type: "text",
          name: "username",
          // value: this.username,
          placeholder: "username",
        },
      ],
    });
    await alert.present();
  }

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
            console.log(data);
            await this.updateAccountPassword(data)
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
    await this.alertService.presentLoading("Logging Out...",2000);
    await this.userData.logout();
  }

  support() {
    this.router.navigateByUrl("/support");
  }




 private async updateAccountPassword(contextParamValue) {
    //console.log(contextParamValue,"what is this??");

    (await this.accountService
      .update(this.accountID, contextParamValue))
      .pipe(first())
      .subscribe({
        next: async () => {
          this.alertService.createToastAlert(
            "Update to Password Successful",
            "success",
            8000
          );
          this.ionViewDidEnter();
        },
        error: async (error) => {
          this.alertService.createToastAlert(
            "Update to Property Master List Failed...",
            "warning",
            8000
          );
        },
      });
  }
}
