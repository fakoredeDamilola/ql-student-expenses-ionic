import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { SwUpdate } from "@angular/service-worker";

import { LoadingController, MenuController, Platform, ToastController } from "@ionic/angular";

import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { Storage } from "@ionic/storage";

import { UserData } from "./providers/user-data";
import { AccountService, AlertService } from "@app/_services";
import { Account, Role } from "@app/_models";


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
  loading: Promise<HTMLIonLoadingElement>;
  loggingOut: Promise<HTMLIonLoadingElement>;

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
    private toastCtrl: ToastController,
    private alertService: AlertService,
  ) {
    this.loading = this.alertService.presentLoading("Pet Check &#10003;");
    this.loggingOut = this.alertService.presentLoading("Logging Out...");
    this.accountService.account.subscribe((x) => (this.account = x));
    this.initializeApp();
  }

  async ionViewDidEnter() {
    (await (this.loading)).dismiss();
    this.splashScreen.hide();
  }

  async ionViewWillEnter(){

  }

  async ngOnInit() {
    this.splashScreen.show();
    await this.checkLoginStatus();
    await this.listenForLoginEvents();

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
      await toast
        .onDidDismiss()
        .then(async () => await this.swUpdate.activateUpdate())
        .then(async () => window.location.reload());
    });
  }

  async initializeApp() {
    await this.platform.ready().then(async () => {
      (await (this.loading)).present();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).then(async () => {
      (await (this.loading)).dismiss();
    });
  }

  async checkLoginStatus() {
    const loggedIn = await this.userData.isLoggedIn();
    return await this.updateLoggedInStatus(loggedIn);
  }

  async updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(async () => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  async listenForLoginEvents() {
    window.addEventListener("user:login", async () => {
      await this.updateLoggedInStatus(true);
    });

    window.addEventListener("user:signup", async () => {
      await this.updateLoggedInStatus(true);
    });

    window.addEventListener("user:logout", async () => {
      await this.updateLoggedInStatus(false);
    });
  }

  async logout() {
    (await (this.loggingOut)).present();
    await this.userData.logout();
    (await (this.loggingOut)).dismiss();
    //await this.accountService.logout();
  }

  async openTutorial() {
    await this.menu.enable(false);
    await this.storage.set("ion_did_tutorial", false);
    await this.router.navigateByUrl("/tutorial");
  }
}
