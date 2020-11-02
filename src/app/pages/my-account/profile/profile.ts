import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "@app/_services";

import { AlertController } from "@ionic/angular";
import { first } from "rxjs/operators";

import { UserData } from "../../../providers/user-data";

@Component({
  selector: "page-account",
  templateUrl: "profile.html",
  styleUrls: ["./profile.scss"],
})
export class ProfilePage implements OnInit {
  // Get currently logged in accounts values
  account = this.accountService.accountValue;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    public accountService: AccountService
  ) {}

  ngOnInit() {}

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

  changePassword() {
    console.log("Clicked to change password");
  }

  logout() {
    this.userData.logout();
  }

  support() {
    this.router.navigateByUrl("/support");
  }
}
