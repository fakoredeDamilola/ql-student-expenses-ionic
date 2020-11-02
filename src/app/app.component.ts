import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { SwUpdate } from "@angular/service-worker";

import { MenuController, Platform, ToastController } from "@ionic/angular";

import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { Storage } from "@ionic/storage";

import { UserData } from "./providers/user-data";
import { AccountService } from "./_services";
import { Account, Role } from "./_models";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  Role = Role;
  account: Account;

  appAdminPages = [
    {
      title: "Accounts",
      url: "/admin/accounts",
      icon: "people",
    },
    {
      title: "Properties",
      url: "/admin/properties",
      icon: "home",
    },
    {
      title: "Pets",
      url: "/admin/pets",
      icon: "checkmark",
    },
  ];

  appPropertyManagerPages = [
    {
      title: "Properties",
      url: "/property-manager/properties",
      icon: "home",
    },
    {
      title: "Pet Owners",
      url: "/property-manager/pet-owners",
      icon: "people",
    },
    {
      title: "Pets",
      url: "/property-manager/pets",
      icon: "checkmark",
    },
  ];

  loggedIn = false;
  dark = false;

  constructor(
    private accountService: AccountService,
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController
  ) {
    this.accountService.account.subscribe((x) => (this.account = x));
    this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async (res) => {
      const toast = await this.toastCtrl.create({
        message: "Update available!",
        position: "bottom",
        buttons: [
          {
            role: "cancel",
            text: "Reload",
          },
        ],
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async checkLoginStatus() {
    const loggedIn = await this.userData.isLoggedIn();
    return this.updateLoggedInStatus(loggedIn);
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener("user:login", () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener("user:signup", () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener("user:logout", () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData.logout();
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set("ion_did_tutorial", false);
    this.router.navigateByUrl("/tutorial");
  }
}
