import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  IonList,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  ToastController,
  Config,
} from "@ionic/angular";
import { AccountsFilterPage } from "./accounts-filter/accounts-filter";
import { AccountService, AlertService } from "@app/_services";
import { Account } from "@app/_models";
import { first } from "rxjs/operators";
import * as moment from "moment";

@Component({
  selector: "page-admin-accounts",
  templateUrl: "accounts.html",
  styleUrls: ["./accounts.scss"],
})
export class AccountsPage {
  // Gets a reference to the list element
  @ViewChild("allAccountsList", { static: true }) allAccountsList: IonList;

  ios: boolean;
  queryText = "";
  segment = "all";
  showSearchbar: boolean;
  loading: any;
  allAccounts: any | [Account];
  adminsIsChecked: boolean;
  studentsIsChecked: boolean;
  reportsManagersIsChecked: boolean;
  filtersList: any;

  adminCondition: string = "";
  studentCondition: string = "";
  reportsManagerCondition: string = "";

  constructor(
    public alertCtrl: AlertController,
    private alertService: AlertService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public config: Config,
    private accountService: AccountService
  ) {}

  async ionViewDidEnter() {}

  async ionViewWillEnter() {
    this.loading = this.alertService.presentLoading("Admin Student Expenses");
    //console.log("true1");
    (await this.loading).present();
    this.adminsIsChecked = true;
    this.studentsIsChecked = true;
    this.reportsManagersIsChecked = true;
    this.ios = this.config.get("mode") === "ios";

    // this is faster but using the later to visualize data
    /* (await this.accountService.getAll())
      .pipe(first())
      .subscribe((accounts) => (this.allAccounts = accounts));
    */
    //this.updateSchedule();
    (await this.accountService.getAll())
      .forEach(async (Element) => {
        this.allAccounts = Element;
        console.log(this.allAccounts, "right here");
      })
      .then(async () => {
        const accountsCount = this.allAccounts.length;
        for (let i = 0; i < accountsCount; i++) {
          this.allAccounts[i].created = moment(
            this.allAccounts[i].created
          ).format("MM-DD-YYYY @HH:mm:ss");
        }
      })
      .finally(async () => {
        setTimeout(async () => {
          (await this.loading).dismiss();
        }, 300);
      });
  }

  // Updates main view from filter...very cool
  async updateView() {
    // TODO make this a switch case statement
    if (this.adminsIsChecked == false) {
      this.adminCondition = "Admin";
    }
    if (this.adminsIsChecked == true) {
      this.adminCondition = "";
    }
    if (this.studentsIsChecked == false) {
      this.studentCondition = "Student";
    }
    if (this.studentsIsChecked == true) {
      this.studentCondition = "";
    }
    if (this.reportsManagersIsChecked == false) {
      this.reportsManagerCondition = "ReportsManager";
    }
    if (this.reportsManagersIsChecked == true) {
      this.reportsManagerCondition = "";
    }
  }

  async presentFilter() {
    this.filtersList = {
      adminsIsChecked: this.adminsIsChecked,
      studentsIsChecked: this.studentsIsChecked,
      reportsManagersIsChecked: this.reportsManagersIsChecked,
    };

    const modal = await this.modalCtrl.create({
      component: AccountsFilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { filtersList: await this.filtersList },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.adminsIsChecked = await data.adminsIsChecked;
      this.studentsIsChecked = await data.studentsIsChecked;
      this.reportsManagersIsChecked = await data.reportsManagersIsChecked;
      this.updateView();
    }
  }
}
